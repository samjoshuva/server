const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

const users = mongoose.model('User', new mongoose.Schema({
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
   const users = await users.find().sort("name");
   res.send(users);
});



router.get('/:id', async (req, res) => {
   const user = await users.find({
      _id: req.params.id
   });
   if (!user) return res.status(400).send("no such user register");




   res.send(user);
});



router.post('/', async (req, res) => {
   const {
      error
   } = validateUser(req.body);
   if (error) return res.status(400).send(error.details[0].message);


   user = new users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
   });

   user = await user.save();

   res.send(user)
});

router.put('/:id', async (req, res) => {
   const {
      error
   } = validateUser(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const user = await users.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
   }, {
      new: true
   })

   res.send(user);
});

router.delete('/:id', async (req, res) => {
   user = await users.findByIdAndDelete(req.params.id, )

   if (!user) return res.status(400).send("no such user register");

   res.send(user);
});


function validateUser(user) {
   const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(50).required(),
      password: Joi.string().min(5).max(50).required(),
   };

   return Joi.validate(user, schema);
}




module.exports = router;
