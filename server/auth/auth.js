const Joi = require('joi');
const bcryptjs = require('bcryptjs');
const {User} = require('../models/User');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcryptjs.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  try{
    const token = user.generateAuthToken();
      res.header('x-auth-token', token).send(token);
  }catch(error){
    res.status(500).send('Something failed.');
  }
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router; 
