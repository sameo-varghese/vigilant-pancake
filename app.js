// Task1: initiate app and run server at 3000

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const postmodel = require('./model/post')

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/Frontend')));

// Task2: create mongoDB connection 


mongoose.connect("mongodb+srv://athulps:athulps@athulps.80h2hoh.mongodb.net/?retryWrites=true&w=majority&appName=athulps")
.then(()=>{
    console.log('connected to db')
})

.catch((err)=>{
    console.log(err)
})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

app.use(express.json());

//api


//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', async (req, res) => {
    try {
      const employees = await postmodel.find();
      res.send( employees );
    } catch (error) {
      console.log(error);
    }
  });


//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const data = await postmodel.findById(id);
      res.send({ employee });
    } catch (error) {
      console.log(error);
    }
  });

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    try{
        const data = req.body;
        let newUser = await postmodel(data).save();
        res.send({message: "Data added"})
    } catch(error) {
        console.log(error)
    }
});

//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deletedUser = await postmodel.findByIdAndDelete({ _id: id });
      res.send({ deletedUser });
    } catch (error) {
      console.log(error);
    }
  });


//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const updatedUser = await postmodel.findOneAndUpdate({ _id: id }, { $set: data }, { new: true });
      res.send({ updatedUser });
    } catch (error) {
      console.log(error);
    }
  });


app.listen(3000,()=>{
    console.log("running in 3000")
})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



