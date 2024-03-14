const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    habit: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit' },
    date: {
        type: Date
    },
    status: {
      type: String,
      enum: ['Complete', 'Incomplete'],
      default: 'Incomplete', // Default to 'Incomplete'
    },
    note: {
        type: String
    }
  }, { timestamps: true });

module.exports = mongoose.model("Record", recordSchema);