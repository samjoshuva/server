const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const auth = require('../middleware/auth');


const projects = mongoose.model('Project', new mongoose.Schema({
   name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30
   },
   username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30
   },
   API: [{
      type: String
   }]
}))




router.get('/:username', auth, async (req, res) => {
   const project = await projects.find({
      username: req.params.username
   }).sort("name");
   if (!project) return res.status(400).send("no such project register");

   res.send(project);
});



router.get('/:id', async (req, res) => {
   const project = await projects.find({
      _id: req.params.id
   });
   if (!project) return res.status(400).send("no such project register");




   res.send(project);
});






router.post('/create', auth, async (req, res) => {
   const {
      error
   } = validateproject(req.body);
   if (error) return res.status(400).send(error.details[0].message);


   project = new projects(req.body);

   project.save().then((result) => {
      res.send(result)
   }).catch((err) => {
      res.status(400).send(err)

   });

   // res.send(project)
});

router.delete('/:id', auth, async (req, res) => {
   project = await projects.findByIdAndDelete(req.params.id, )

   if (!project) return res.status(400).send("no such project register");

   res.send(project);
});


function validateproject(project) {
   const schema = {
      name: Joi.string().min(5).max(50).required(),
      username: Joi.string().min(5).max(50).required()
   };

   return Joi.validate(project, schema);
}




module.exports = router;