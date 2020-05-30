const express = require('express');
const {check} = require('validator');

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
router.get('/user/:uid', placesControllers.getPlacesByUserId);

router.post('/', placesControllers.createPlace);

router.patch('/:pid', placesControllers.updatePlace);

router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;