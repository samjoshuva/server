const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');


mongoose.set('useCreateIndex', true);
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

   },
   tokens: [{
      type: String
   }],
}))



//Get all user
router.get('/', async (req, res) => {
   const users = await users.find().sort("name");
   res.send(users);
});


//get user by id
router.get('/:id', async (req, res) => {
   const user = await users.findOne({
      _id: req.params.id
   });
   if (!user) return res.status(400).send("no such user register");
   res.send(user);
});

//Login user by name
router.post('/login', async (req, res) => {
   const user = await users.findOne({
      email: req.body.email
   });
   if (!user) return res.status(400).send("no such user register");

   bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) throw err;

      if (!result) {
         return res.status(404).send("Password not match")
      }

      const token = jwt.sign(JSON.stringify(user), "secretKey");
      res.send(_.pick(user, ["name", "email"]))
      console.log(token)

   })









});


//Register a user
router.post('/register', async (req, res) => {
   const {
      error
   } = validateUser(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let user = await users.findOne({
      email: req.body.email
   });

   if (user) {
      return res.status(400).send("user already exists");
   }

   user = new users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
   });

   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(user.password, salt);

   user.save().then((result) => {
      res.send(_.pick(result, ["name", "email"]))
   }).catch((err) => {
      res.status(400).send(err)
   });


});


//update user
router.put('/:id', async (req, res) => {

   const user = await users.findByIdAndUpdate(req.params.id, req.body, {
      new: true
   })

   res.send(user);
});


// delete user 
router.delete('/:id', async (req, res) => {
   user = await users.findByIdAndDelete(req.params.id, )

   if (!user) return res.status(400).send("no such user register");

   res.send(user);
});

// validate user object from front end 
function validateUser(user) {
   const schema = {
      name: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(50).required(),
      password: Joi.string().min(5).max(50).required(),
   };

   return Joi.validate(user, schema);
}




module.exports = router;