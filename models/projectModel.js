const mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    plannedEndDate: {
        type: Date
    },
    description: {
        type: String,
        required: true
    },
    projectCode: {
        type: String,
        required: true
    },
    employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'employees'}],
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Export
const Projects = module.exports = mongoose.model('projects', projectSchema);