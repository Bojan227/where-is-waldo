const client = require('../model/waldoModel');

const db = client.db('where-is-waldo');

const getLevel = async (req, res) => {
  const { id } = req.params;
  db.collection('levels')
    .find()
    .toArray()
    .then(results => {
      res.json({ ...results[parseInt(id)][id], level: id });
    })
    .catch(err => console.log(err));
};

const getTimes = async (req, res) => {
  db.collection('scores')
    .find()
    .toArray()
    .then(data => {
      res.status(200).json(data);
    });
};

const timer = async (req, res) => {
  const endTime = req.body.time;
  db.collection('timer')
    .find()
    .toArray()
    .then(result => {
      const start = result[0].time;
      res.status(200).json({ time: endTime - start });
    });
};

const checkCoordinates = async (req, res) => {
  const { x, y, ch, lvl } = req.body;
  db.collection('coordinates')
    .find()
    .toArray()

    .then(results => {
      const char = results[lvl][lvl].char.find(el => el.name === ch);

      if (
        x < parseInt(char.x) + 3 &&
        x > parseInt(char.x) - 3 &&
        y < parseInt(char.y) + 3 &&
        y > parseInt(char.y) - 3
      ) {
        return res.status(200).json({ char: char.name });
      }

      return res.status(404).json({ msg: 'You mised!' });
    });
};

const updateTimer = async (req, res) => {
  const { time } = req.body;
  db.collection('timer')
    .findOneAndUpdate(
      { type: 'time' },
      {
        $set: {
          time,
        },
      }
    )
    .then(() => {
      res.status(200).json({ msg: 'good' });
    });
};

const saveTime = async (req, res) => {
  db.collection('scores')
    .insertOne(req.body)
    .then(() => {
      res.status(200).json({ msg: 'Your score is successfully saved!' });
    })
    .catch(err => console.log(err));
};

const getFile = async (req, res) => {
  res.sendFile('../dist/index.html');
};

const redirectBack = async (req, res) => {
  res.redirect('/');
};

module.exports = {
  getFile,
  redirectBack,
  getLevel,
  getTimes,
  saveTime,
  timer,
  checkCoordinates,
  updateTimer,
};
