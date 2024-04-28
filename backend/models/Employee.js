const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
       
   },
    department:
    {
        type: String,
        require:true
    },
    dateOfJoining: {
        type: Date,
        require:true
    },
    hobbies: {
        type: [String],
        require:true
    },
    address:{
        type: String,
        require:true
    },
    gender:{
        type: String,
        enum: ['Male', 'Female'], require:true

    }

    
});


module.exports = mongoose.model('Employee', employeeSchema)