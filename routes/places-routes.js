const express = require('express');

const router = express.Router();

router.get('/testing', (req, res, next) => {
  console.log('GET request in Places');
  res.json({
    message: '----> It works!'
  })
});

module.exports = router;