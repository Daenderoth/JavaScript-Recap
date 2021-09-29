const mongoose = require('mongoose');

var validateEmail = function(email) {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email)
};

var employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please provide a valid email address.']
    },
    address: {
        type: String,
        required: true
    },
    hireDate: {
        type: Date,
        default: Date.now
    },
    salary: {
        type: Number,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId, ref: 'projects'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Export
const Employees = module.exports = mongoose.model('employees', employeeSchema);

module.exports.get = (callback, limit) => {
    Employees.find(callback).limit(limit); 
}