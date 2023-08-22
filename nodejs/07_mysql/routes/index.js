const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

router.get('/login', (req, res) => {
  return res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
})

router.get('/register', (req, res) => {
  return res.sendFile(path.join(__dirname, '..', 'public', 'register.html'));
})


module.exports = router;
