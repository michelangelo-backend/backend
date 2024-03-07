//THIS FILE IS A RESTART//

const mongoose = require ('mongoose');

const habitSchema = new mongoose.Schema ({
    userID: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'user',
    }, 
    habitName: {
        type: String, 
        required: true, 
    },
    frequency: {
        type: String,
    }, 
    completed: {
        type: Boolean,
        default: false,
    }
})
module.exports = mongoose.model("habit", habitSchema);

