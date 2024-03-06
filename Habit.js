const mongoose = require('mongoose');

const habitSchema = new mongoose.Shecma({
habitname:{
    type: String,
    required: true
}
habitstatus: [
    {
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: String, 
            enum: ['Complete', 'Incomplete']
        }
        streak: {
            type: Number,
            default: "None"
        }


    scheduledHabitList: [
        { 
          type: new mongoose.Schema(
            {
              habitTitle: { type: String },
              frequency: { type: String }, 
              completed: { 
                type: Boolean,
                default: false,
              }
            },
            { timestamps: true }  
          )
      }],
    },
    { timestamps: true }
    }
]

})

const habit = mongoose.model('habit', habitSchema);

