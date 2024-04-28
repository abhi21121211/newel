const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');


async function getEmployee(req, res, next) {
    let employee;
    try {
        employee = await Employee.findById(req.params.id)
        if (employee == null) {
            return res.status(404).json({ message: 'Cannot find employee' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.employee = employee;
    next();
}

router.get('/', async (req, res) => {
    try {
        const searchTerm = req.query.search ? { name: { $regex: req.query.search, $options: 'i' } } : {};
        const employees = await Employee.find(searchTerm);
      
        res.json(employees);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


router.get('/:id', getEmployee, (req, res) => {
    res.json(res.employee);
})


router.post('/', async (req, res) => {
    const employee = new Employee({
        name: req.body.name,
        
        department: req.body.department,
        dateOfJoining: req.body.dateOfJoining,
        hobbies: req.body.hobbies,
        address: req.body.address,
        gender: req.body.gender
    })
    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee)
    } catch (error) {
        res.status(400).json({ massage: error.message });
        
    }
})


router.put('/:id' , getEmployee, async (req, res) => {
    try {

        res.employee.name = req.body.name
        res.employee.department = req.body.department;
        res.employee.dateOfJoining = req.body.dateOfJoining;
        res.employee.hobbies = req.body.hobbies;
        res.employee.address = req.body.address;
        res.employee.gender = req.body.gender;
        
        const updatedEmployee = await res.employee.save()
        res.json(updatedEmployee);

    } catch (error) {
        res.status(400).json({message:error.message})
    }

})

router.delete('/:id',getEmployee, async (req, res) => {
    try {
        await res.employee.remove();
        res.json({message: 'Deleted employee'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})





module.exports = router;