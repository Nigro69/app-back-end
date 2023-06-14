const express = require('express')
const mongoose = require('mongoose')
const Employee = require('./models/employeeModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

const cors = require('cors');
app.use(cors());

//routes

app.get('/', (req, res) => {
    res.send('This is the RestAPI for the React application')
})

app.get('/employee', async(req, res) => {
    try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/employee/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const employee = await Employee.findById(id);
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/employee', async(req, res) => {
    try {
        const employee = await Employee.create(req.body)
        res.status(200).json(employee);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update an employee
app.put('/employee/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const employee = await Employee.findByIdAndUpdate(id, req.body);
        // we cannot find any employee in database
        if(!employee){
            return res.status(404).json({message: `cannot find any employee with ID ${id}`})
        }
        const updatedEmployee = await Employee.findById(id);
        res.status(200).json(updatedEmployee);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// // delete an employee

app.delete('/employee/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        if(!employee){
            return res.status(404).json({message: `cannot find any employee with ID ${id}`})
        }
        res.status(200).json(employee);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://user-123:yash-123@cluster0.upubv8n.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(4000, ()=> {
        console.log(`Node API app is running on port 4000`)
    });
}).catch((error) => {
    console.log(error)
})