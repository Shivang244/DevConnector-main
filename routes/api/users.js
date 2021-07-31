const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const gravatar = require("gravatar");
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route POST api/users
// @desc Register user
// @access Public
router.post(
    "/",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Enter a valid email").isEmail(),
        check(
            "password",
            "Password length must be at least 6 characters!"
        ).isLength({ min: 6 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const { name, email, password } = req.body;

        try {
            // See if user exists
            let user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }
            // Get user's Gravatar
            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm",
            });

            user = new User({
                name,
                email,
                avatar,
                password,
            });
            // Encrypt password

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                },
            };

            // Return jsonwebtoken
            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) {
                        throw err;
                    } else {
                        return res.json({ token });
                    }
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server Error!");
        }
    }
);

// @route GET api/users/events
// @desc Get user's accepted Collabs names as array
// @access Public
router.get("/events", auth, async (req, res) => {
  try {
      console.log(req.user)
    const events = await User.findById(req.user.id).select("acceptedCollabs");
    if (!events) {
      res.send("User has no accepted Collabs");
    }
    //console.log(events);
    var colID = [];
    //console.log(events.acceptedCollabs);
    events.acceptedCollabs.forEach((i) => {
      colID.push(i.collab);
    });
    //console.log(colID);

    const records = await Collab.find().where("_id").in(colID).exec();
    const eventNames = [];
    records.forEach(async (ele) => {
      eventNames.push(ele.eventName);
    });
    //console.log(eventNames);
    res.json(eventNames);
  } catch (err) {
    //console.log(err);
    res.status(500).send("Server Error!");
  }
});
module.exports = router;
