const express = require('express');

const router = express.Router();

// GET => /a
router.get('/a', (req, res) => {
  res.send('get a');
});
router.post('/a', (req, res) => {
  res.send('post a');
});
router.get('/b', (req, res) => {
  res.send('get b');
});
router.get('/c', (req, res) => {
  res.send('get c');
});

module.exports = router;