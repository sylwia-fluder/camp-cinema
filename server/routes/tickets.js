const {Ticket, validate} = require('../models/Ticket'); 
const {Screening} = require('../models/Screening'); 
const {User} = require('../models/User'); 
const {seatUpdateAsReserved} = require('../controllers/screenings');
const {sentTicketToUserDate} = require('../controllers/tickets');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
  const tickets = await Ticket.find().sort('movie.title').sort('screening.date');
  res.send(tickets);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const screening = await Screening.findById(req.body.screeningId);
  if (!screening) return res.status(400).send('Invalid screening.');

  const place = await screening.screeningRoom.find((place) => place.row === req.body.row && place.seatNumber === req.body.seatNumber);
  if(place.status === 'reservation') return res.status(400).send('seat is already reserved');

  let user =  await User.findById(req.body.userId);
  if(req.body.userId && !user) return res.status(400).send('The user with the given ID was not found.');

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
      row: req.body.row,
      seatNumber:req.body.seatNumber
    }
  });
  await ticket.save();
  
  await sentTicketToUserDate(req.body.userId,ticket);
  await seatUpdateAsReserved(res, req.body.screeningId, req.body.row, req.body.seatNumber);
});

router.get('/:id', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) return res.status(404).send('The ticket with the given ID was not found.');

  res.send(ticket);
});


module.exports = router; 