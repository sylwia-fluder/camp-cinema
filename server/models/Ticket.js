const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const userSchema = require('../models/User');

const Ticket = mongoose.model('Ticket', new mongoose.Schema({
  customer: { 
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      } ,
      user: {
        type: userSchema
      }     
    }),  
    required: true
  },
  screening: {
    type: new mongoose.Schema({
      movieTitle: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
      },
      date: {
        type:Date,
        required: true,
      }
    }),
    required: true
  },
  price: {
    type: Number,
    required: true,
    get: v => (v = Math.round(v * 100) / 100),
    set: v => (v = Math.round(v * 100) / 100),
  },
  isReduction: {
    type:Boolean,
    default:false
  },
  place: { 
    type: new mongoose.Schema({
      rowNumber: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 20
      },
      seatNumber: {
        type: Number,
        required: true,
        minlength: 0,
        maxlength: 20
      }      
    }),  
    required: true
  }
}));

function validateTicket(ticket) {
  const schema = {
    screeningId: Joi.objectId().required(),
    customerName: Joi.string().min(5).max(50).required(),
    customerEmail: Joi.string().min(5).max(255).required().email(),
    userId:  Joi.objectId(),
    price: Joi.number().required(),
    isReduction: Joi.boolean(),
    rowNumber: Joi.number().integer().required().min(0).max(20),
    seatNumber: Joi.number().integer().required().min(0).max(20),
  };

  return Joi.validate(ticket, schema);
}

exports.Ticket = Ticket; 
exports.validate = validateTicket;