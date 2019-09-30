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
    max: 18,
    min: 0
  },
  runningTime: {
    type: Number,
    get: v => (v = Math.round(v * 100) / 100),
    set: v => (v = Math.round(v * 100) / 100),
    min: 0
  },
  movieDescription: {
    type: String
  },
  director: {
    type: String,
    minlength: 5,
    maxlength: 255
  },
  cast: {
    type: Array
  },
  production: {
    type: String,  
    minlength: 5,
    maxlength: 255
  },
  releaseDate: {
    type: Date, 
  },
  posterURL: {
    type: String,
    required:  true,
    maxlength: 255
  }
}));

function validateMovie(movie) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genre: Joi.string().min(5).max(50).required(),
    ageLimit: Joi.number().max(18).min(0),
    runningTime: Joi.number().min(0),
    movieDescription: Joi.string(),
    direction: Joi.string().min(5).max(50),
    cast: Joi.array(),
    production: Joi.string().min(5).max(50),
    releaseDate: Joi.date(),
    posterURL: Joi.string().min(5).max(50).required(),
  };

  return Joi.validate(movie, schema);
}

exports.Movie = Movie; 
exports.validate = validateMovie;