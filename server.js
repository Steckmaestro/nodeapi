// Import db objects
const AppDAO = require('./dao');
const HeroRepo = require('./models/heroRepo');
const EventRepo = require('./models/eventRepo');

let heroRepo, eventRepo;

// Init db instance
const init = () => {
  const dao = new AppDAO('./database.sqlite3');
  heroRepo = new HeroRepo(dao);
  eventRepo = new EventRepo(dao);

  // Init db and invoke immediately
  const initDb = require('./initDb')(heroRepo, eventRepo);
};

init();

// Init HTTP server
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(cors({ credentials: true }));

app.use((req, res, next) => {
  //doesn't send response just adjusts it
  res.header('Access-Control-Allow-Origin', '*'); //* to give access to any origin
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization' //to give access to all the headers provided
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'); //to give access to all the methods provided
    return res.status(200).json({});
  }
  next(); //so that other routes can take over
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Heroes routes
app.post('/heroes', async (req, res) => {
  try {
    const { name, avatar } = req.body;
    console.log(req.body);
    const hero = await heroRepo.create(name, avatar);
    res.status(200).send(hero);
  } catch (e) {
    console.log('Error: ', e);
    res.status(500).send(e);
  }
});
app.get('/heroes', async (req, res) => {
  try {
    const heroes = await heroRepo.getAll();
    res.status(200).send(heroes);
  } catch (e) {
    console.log('Error: ', e);
    res.status(500).send(e);
  }
});
app.get('/heroes/withmostlove', async (req, res) => {
  try {
    const stats = await heroRepo.getWithMostLove();
    res.status(200).send(stats);
  } catch (e) {
    console.log('Error: ', e);
    res.status(500).send(e);
  }
});
app.get('/heroes/withmostcoffee', async (req, res) => {
  try {
    const stats = await heroRepo.getWithMostCoffees();
    res.status(200).send(stats);
  } catch (e) {
    console.log('Error: ', e);
    res.status(500).send(e);
  }
});
app.get('/heroes/:id', async (req, res) => {
  try {
    const heroes = await heroRepo.getById(req.params.id);
    res.status(200).send(heroes);
  } catch (e) {
    console.log('Error: ', e);
    res.status(500).send(e);
  }
});
app.get('/heroes/events/:id', async (req, res) => {
  try {
    const heroes = await heroRepo.getEvents(req.params.id);
    res.status(200).send(heroes);
  } catch (e) {
    console.log('Error: ', e);
    res.status(500).send(e);
  }
});
app.delete('/heroes/:id', async (req, res) => {
  try {
    const heroes = await heroRepo.delete(req.params.id);
    res.status(200).send(heroes);
  } catch (e) {
    console.log('Error: ', e);
    res.status(500).send(e);
  }
});

// Events routes
app.post('/events', async (req, res) => {
  try {
    const { name, created, love, heroId } = req.body;
    console.log(req.body);
    const _event = await eventRepo.create(name, created, love, heroId);
    res.status(200).send(_event);
  } catch (e) {
    console.log('Error: ', e);
    res.status(500).send(e);
  }
});
app.get('/events', async (req, res) => {
  try {
    const events = await eventRepo.getAll();
    res.status(200).send(events);
  } catch (e) {
    console.log('Error: ', e);
    res.status(500).send(e);
  }
});
app.get('/events/:id', async (req, res) => {
  try {
    const event = await eventRepo.getById(req.params.id);
    res.status(200).send(event);
  } catch (e) {
    console.log('Error: ', e);
    res.status(500).send(e);
  }
});
app.delete('/events/:id', async (req, res) => {
  try {
    const event = await eventRepo.delete(req.params.id);
    res.status(200).send(event);
  } catch (e) {
    console.log('Error: ', e);
    res.status(500).send(e);
  }
});
app.patch('/events/:id', async (req, res) => {
  try {
    const event = await eventRepo.sendLove(req.params.id);
    res.status(200).send(event);
  } catch (e) {
    console.log('Error: ', e);
    res.status(500).send(e);
  }
});

const port = process.env.PORT || 3025;

app.listen(port, () => {
  console.log('We are live on port: ', port);
});
