const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
        {
          habitName: { 
              type: String, 
              required: true 
            },
          numVal: {
              type: Number, 
              required: true
          }, 
          unit: {
            type: String, 
            required: true
            },
          comment: { 
              type: String 
            }, 
          completed: { 
              type: Boolean,
              default: false,
            },
            streak: {
              type: Number,
              default: 0,
            },
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          },
          { timestamps: true }  
        );

module.exports = mongoose.model("Habit", habitSchema);