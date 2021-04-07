const mongoose = require('mongoose');

const CommandSchema = new mongoose
  .Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    aliases: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model("Command", CommandSchema);