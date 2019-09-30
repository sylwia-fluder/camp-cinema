const pick = require('lodash');
const Router = require('express');
const {Movie, validate} = require('../models/Movie');
const router = Router();

router.get('/', async (req, res) => {
  res.send(await Movie.find().sort('title'));
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) return res.status(404).send('The movie with given ID is not found!');
  res.send(movie);
});

router.get('/browserTitle/:title', async (req, res) => {
  const movie = await Movie.find({title: req.params.title});
  if (!movie) return res.status(404).send('The movie with the given title was not found.');
  res.send(movie);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  let movie = new Movie({
    title: req.body.title,
    genre: req.body.genre,
    ageLimit: req.body.ageLimit,
    runningTime: req.body.runningTime,
    movieDescription: req.body.movieDescription,
    direction:req.body.direction,
    cast: req.body.cast,
    production: req.body.production,
    releaseDate: req.body.releaseDate,
    posterURL: req.body.posterURL
  });

  movie = await movie.save();

  res.send(movie);
});

router.put('/:id', async (req, res) => {
  let movie = await Movie.findByIdAndUpdate(
    req.params.id,
    pick(req.body, ['title', 'genre', 'ageLimit', 'runningTime', 'movieDescription','direction','cast','production','releaseDate','posterURL']),
    { new: true }
  );
  if (!movie) return res.status(404).send('The movie with given ID is not found!');
  res.send(movie);
});
  
router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) return res.status(404).send('The movie with given ID is not found!');
  res.send(movie);
});

module.exports = router;



