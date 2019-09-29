const Joi = require('joi');
const mongoose = require('mongoose');

const Movie = mongoose.model('Movies', new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  genre: { 
    type: String,  
    required: true,
    minlength: 5,
    maxlength: 255
  },
  ageLimit: {
    type: Number,
    get: v => (v = Math.round(v)),
    set: v => (v = Math.round(v)),
    max: 18
  },
  posterURL: {
    type: String,
    required:  true,
    minlength: 5,
    maxlength: 255
  }
}));

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genre: Joi.string().min(5).max(50).required(),
    ageLimit: Joi.number().max(18),
    posterURL: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie; 
exports.validate = validateMovie;