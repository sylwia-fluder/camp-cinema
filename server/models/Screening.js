const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const Screening = mongoose.model(
  'Screening',
  new mongoose.Schema({
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          minlength: 1,
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
          default: 0,
          get: v => (v = Math.round(v)),
          set: v => (v = Math.round(v)),
          max: 18,
          min: 0
        }
      }),
      required:true,
    },
    priceNormalTicket: {
      type: Number,
      required: true,
      get: v => (v = Math.round(v * 100) / 100),
      set: v => (v = Math.round(v * 100) / 100),
    },
    typeOfScreening: {
      type: String,
      default: '2D',
      enum: ['2D','3D','4D']
    },
    language: {
      type: String,
      default: 'Original (SUB PL)',
      enum: ['PL','EN (SUB PL)', 'DUB PL','Original', 'Original (SUB PL)'],
    },
    date: {
      type:Date,
      required: true,
    }
  })
);

function validateScreening(screening) {
  const schema = {
    movieId: Joi.objectId().required(),
    priceNormalTicket: Joi.number().required(),
    typeOfScreening: Joi.string().allow('2D','3D','4D'),
    language: Joi.string().allow('PL','EN (SUB PL)', 'DUB PL','Original', 'Original (SUB PL)'),
    date: Joi.date().required(),
  };

  return Joi.validate(screening, schema);
}

exports.Screening = Screening;
exports.validate = validateScreening;
