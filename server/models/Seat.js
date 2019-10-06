const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Seat = mongoose.model(
  'Seat',
  new mongoose.Schema({
    row: {
      type: Number,
      required:true,
    },
    seatNumber:{
      type: Number,
      required:true
    },
    status: {
      type:String,
      default:'available'
    }
  }));

function validateSeat(seat) {
  const schema = {
    row:  Joi.number().required().min(1).max(9),
    num:  Joi.number().required().min(1).max(14),
  };
  
  return Joi.validate(seat, schema);
}

exports.Seat = Seat;
exports.validateSeat = validateSeat;