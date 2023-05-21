const mongoose = require("mongoose");

const msg = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  msg: {
    type: String,
  },
});

// collection
const Messages = new mongoose.model("messages", msg);

module.exports = Messages;
