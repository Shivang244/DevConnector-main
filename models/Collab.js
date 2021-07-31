const mongoose = require("mongoose");

const collabSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
  },
  avatar: {
    type: String,
  },
  type: {
    type: String, // project / event
    required: true,
  },
  organizer: {
    type: String, //Organising committee
  },
  location: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  membersRequired: {
    type: Number,
  },
  accepted: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId, // ! Add admin to list too
        ref: "user",
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  etd: {
    type: Date, //Date of delivery of project or conducting the event
  },
});

// Collab.pre('remove', function(next) {
//     // Remove all the assignment docs that reference the removed person.
//     this.model('Assignment').remove({ collab: this._id }, next);
// });

module.exports = Collab = mongoose.model("collab", collabSchema);
