const express = require('express');

const router = express.Router();

const {
  getFile,
  redirectBack,
  getLevel,
  getTimes,
  saveTime,
  timer,
  checkCoordinates,
  updateTimer,
} = require('../controllers/waldoControllers');

// GET requests

router.get('/', getFile);

router.get('/game', redirectBack);

router.get('/leaderboard', redirectBack);

router.get('/level/:id', getLevel);

router.get('/times', getTimes);

// POST requests

router.post('/save', saveTime);

router.post('/timer', timer);

router.post('/coord', checkCoordinates);

// Patch request
router.patch('/timer', updateTimer);

module.exports = router;
