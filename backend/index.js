const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');
const cors =require('cors');

const app = express();

app.use(cors());



app.use(bodyParser.json());;


app.use('/api/employees', employeeRoutes);



mongoose.connect('mongodb://localhost:27017/newel', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));
    





const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{console.log("Server is listening on port " + PORT);})