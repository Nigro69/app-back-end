const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a Employee name"]
        },
        email: {
            type: String,
            required: true,
        },
        number: {
            type: Number,
            required: true,
        },
        nic: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    }
)


const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;