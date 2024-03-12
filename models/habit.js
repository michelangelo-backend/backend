const mongoose = require ('mongoose');

const habitSchema = new mongoose.Schema ({
    
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    habitTitle:{
        type: String,
        required: true
    }, 
    namVal:{
        type: Number, 
        required: true
    }, 
    unit: {
    type: String, 
    required: true
    },


})
module.exports = mongoose.model("habit", habitSchema);
