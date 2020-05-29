const express = require('express');

const placesControllers = require('../controllers/places-controllers');

const router = express.Router();


router.get('/testing', (req, res, next) => {
  console.log('GET request in Places, endpoint /testing');
  res.json({                                                       //---> technically this is now actually a middleware fn !
    message: '----> It works!'
  })
});

router.get('/:pid', placesControllers.getPlaceById);
                                                       //------> DON"T FORGET THAT THE SEQUENCE OF YOUR ROUTES MATTERS !
router.get('/user/:uid', placesControllers.getPlaceByUserId);

router.post('/', placesControllers.createPlace);

router.patch('/:pid', );

router.delete('/:pid', );

module.exports = router;