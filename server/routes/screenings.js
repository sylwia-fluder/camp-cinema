const {Screening, validate, validatePlace} = require('../models/Screening');
const {Movie} = require('../models/Movie');
const pick = require('lodash');
const express = require('express');
const router = express.Router();
const {getScreeningRoom, seatUpdateAsReserved} =require('../controllers/screenings');

router.get('/', async (req, res) => {
  res.send(await Screening.find().sort('movie.title').sort('date'));
});

router.get('/:id', async (req, res) => {
  const screening = await Screening.findById(req.params.id);
  
  if (!screening) return res.status(404).send('The screening with the given ID was not found.');
  
  res.send(screening);
});

router.get('/browserTitle/:title', async (req, res) => {
  const screening = await Screening.find({'movie.title': req.params.title}).sort('date');
     
  res.send(screening);
});
  

router.post('/', async (req, res) => {
  const {error} = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const movie = await Movie.findById(req.body.movieId);
  if (!movie)
    return res.status(404).send('The movie with given ID is not found!');
  let screening = new Screening({
    movie: {
      _id: movie._id,
      title: movie.title,
      genre: movie.genre,
      ageLimit: movie.ageLimit
    },
    priceNormalTicket: req.body.priceNormalTicket,
    typeOfScreening: req.body.typeOfScreening,
    language: req.body.language,
    date: req.body.date,
    screeningRoom: getScreeningRoom(),
  });
  screening = await screening.save();

  res.send(screening);
});

router.put('/reservation/:id', async (req, res) => {
  const {error} = validatePlace(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  res.send(await seatUpdateAsReserved(res, req.params.id, req.body.row, req.body.num));
});

router.put('/:id', async (req, res) => {
  const screening = await Screening.findByIdAndUpdate(
    req.params.id,
    pick(req.body, ['priceNormalTicket','typeOfScreening','language','date']),{ new: true });
  if (!screening) return res.status(404).send('The screening with given ID is not found!');
  res.send(screening);
});

router.delete('/:id', async (req, res) => {
  const screening = await Screening.findByIdAndRemove(req.params.id);
  
  if (!screening) return res.status(404).send('The screening with the given ID was not found.');
  
  res.send(screening);
});

module.exports = router; 