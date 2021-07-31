const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Collab = require("../../models/Collab");
const User = require("../../models/User");
const { json } = require("express");
const { post } = require("request");

// @route POST api/collab
// @desc create a new event
// @access Private
router.post("/", [
  auth,
  [
    check("text", "Text is required").not().isEmpty(),
    check("type", "Mentioning the type of required collaboration is required")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const newCollab = new Collab({
        name: user.name,
        eventName: req.body.eventName,
        avatar: user.avatar,
        user: user._id,
        type: req.body.type,
        organizer: req.body.organizer, // ! CHECK
        text: req.body.text,
        location: req.body.location,
        membersRequired: req.body.membersRequired,
        etd: req.body.etd,
      });
      newCollab.accepted.unshift({ user: user._id }); //Add the event admin to the accepted list

      const collab = await newCollab.save();

      //Add the event to user's acceptedProjects list
      const l = user.acceptedCollabs.unshift({ collab: collab._id });
      //console.log(user, l);

      res.status(200).json(collab);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error!");
    }
  },
]);

// @route GET api/collab
// @desc Get all events
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const events = await Collab.find({}).sort({ date: -1 });

    res.status(200).json(events);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error!");
  }
});

// @route GET api/collab/:id
// @desc Get event by id
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const event = await Collab.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event Not Found" });
    }
    res.json(event);
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Event Not Found!" });
    }
    res.status(500).send("Server error!");
  }
});

// @route DELETE api/collab/:id
// @desc Delete an event
// @access Private
router.delete(":/id", auth, async (req, res) => {
  try {
    const event = await Collab.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found! " });
    }

    if (Collab.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorised" });
    }

    await event.remove();

    //! Remove the event from all users.acceptedProjects cant be implemented rn so CHECK Collab.preHooks

    res.json({ msg: "Event removed" });
  } catch (err) {
    console.log(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Event not found!" });
    }
    res.status(500).send("Server error!");
  }
});

// @route PUT api/collab/accept/:id
// @desc accept a collab
// @access Private
router.put("/accept/:id", auth, async (req, res) => {
  try {
    const event = await Collab.findById(req.params.id);
    const user = await User.findById(req.user.id).select("-password");

    //Check if user has already accepted this
    if (
      event.accepted.filter((accept) => accept.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Already accepted! " });
    }

    event.accepted.unshift({ user: req.user.id });
    event.membersRequired = event.membersRequired - 1;

    await event.save();

    //TODO: ADDED ACCEPTED EVENTS TO USERS OWN PROFILE AND LINK WITH CHAT ROOM MODULE

    //Add the event to user's acceptedProjects list
    console.log(user.acceptedCollabs);

    user.acceptedCollabs.unshift({ collab: req.params.id });
    await user.save();

    res.json(event.accepted);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error!");
  }
});

// @route PUT api/collab/reject/:id
// @desc Reject a collab
// @access Private
router.put("/reject/:id", auth, async (req, res) => {
  try {
    const event = await Collab.findById(req.params.id);
    const user = await User.findById(req.user.id).select("-password");
    //Check if user has already Liked this
    console.log(user);
    if (
      event.accepted.filter((accept) => accept.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Event has not been accepted yet " });
    }

    //Get remove index
    let index = event.accepted
      .map((accept) => accept.user.toString())
      .indexOf(req.user.id);

    event.accepted.splice(index, 1); //starts deleting the mentioned number of elements from index
    event.membersRequired = event.membersRequired + 1;

    await event.save();

    //TODO: RejectED THE event from users profile - show in chat window
    //Remove the event from user's acceptedCollabs list
    index = user.acceptedCollabs
      .map((accept) => accept.collab.toString())
      .indexOf(event._id);
    user.acceptedCollabs.splice(index, 1);

    await user.save();

    res.json(event.accepted);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error!");
  }
});

module.exports = router;
