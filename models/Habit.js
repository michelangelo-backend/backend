const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
          {
            habitTitle: { type: String },
            frequency: { type: String }, 
            completed: { 
              type: Boolean,
              default: false,
            },
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          },
          { timestamps: true }  
        );

module.exports = mongoose.model("Habit", habitSchema);