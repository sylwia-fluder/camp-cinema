const {Ticket, validate} = require('../models/Ticket'); 
const {Screening} = require('../models/Screening'); 
const {User} = require('../models/User'); 
const {checkSeatStatus, seatUpdateAsReserved} = require('../controllers/screenings');
const {sentTicketToUserDate} = require('../controllers/tickets');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

//Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const tickets = await Ticket.find().sort('movie.title').sort('screening.date');
  res.send(tickets);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const screening = await Screening.findById(req.body.screeningId);
  if (!screening) return res.status(400).send('Invalid screening.');

  if(!(await checkSeatStatus(req.body.screeningId, req.body.rowNumber, req.body.seatNumber))) return res.status(400).send('Seat already reserved');
  
  let user =  await User.findById(req.body.userId);
  if(req.body.userId&&!user) return res.status(400).send('The user with the given ID was not found.');

  let ticket = new Ticket({ 
    customer: {
      name: req.body.customerName,
      email: req.body.customerEmail,
      user: {
        _id: req.body.userId,
      }
    },
    screening: {
      movieTitle: screening.movie.title,
      date: screening.date
    },
    price: req.body.price,
    isReduction: req.body.isReduction,
    place:{
      rowNumber: req.body.rowNumber,
      seatNumber:req.body.seatNumber
    }
  });

  
  /*await new Fawn.Task()
    .save('tickets', ticket)
    .update('screenings', { _id: req.body.screeningId, 'screeningRoom.row' : req.body.row, 'screeningRoom.seatNumber':req.body.seatNumber }, 
      { '$set': {'screeningRoom.$.status': 'reserved' }})
    .run()
    .then(console.log(screening.screeningRoom.find(place => place.row === req.body.row&&place.seatNumber === req.body.seatNumber)));
   */ 

  
  await seatUpdateAsReserved(res, req.body.screeningId, req.body.rowNumber, req.body.seatNumber);
  await sentTicketToUserDate(req.body.userId,ticket);
  
  res.send(screening);
  
});

module.exports = router; 