const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');


const projects = mongoose.model('Project', new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30
   },
   email: {
      type: String,
      required: true,
      minlength: 5,
      unique: true,
      maxlength: 30
   },
   password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30
   }
}))




router.get('/', async (req, res) => {
   const projects = await projects.find().sort("name");
   res.send(projects);
});



router.get('/:id', async (req, res) => {
   const project = await projects.find({
      _id: req.params.id
   });
   if (!project) return res.status(400).send("no such project register");




   res.send(project);
});



router.post('/', async (req, res) => {
   const {
      error
   } = validateproject(req.body);
   if (error) return res.status(400).send(error.details[0].message);


   project = new projects({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
   });

   project = await project.save();

   res.send(project)
});

router.put('/:id', async (req, res) => {
   const {
      error
   } = validateproject(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const project = await projects.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
   }, {
      new: true
   })

   res.send(project);
});

router.delete('/:id', async (req, res) => {
   project = await projects.findByIdAndDelete(req.params.id, )

   if (!project) return res.status(400).send("no such project register");

   res.send(project);
});


function validateproject(project) {
   const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(50).required(),
      password: Joi.string().min(5).max(50).required(),
   };

   return Joi.validate(project, schema);
}




module.exports = router;