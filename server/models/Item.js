const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 4
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 4
  }
});

exports.Item = mongoose.model("Item", ItemSchema);
