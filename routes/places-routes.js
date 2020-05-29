const express = require('express');

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world.',
    imageUrl: 'https://lh6.googleusercontent.com/proxy/e-uaRXnEw7eRiz_o1herqMfTZdHev2iBayVdC_P8qoYx5CbHTWVSmie0-qj1V9OCOU7Ijd8XWfeHROcz2SBRJMyqcX08KPx5l9XDMHBz80_JNOUKRZHCYt0fUF5pyo5QS9LfWmJmRsNVaLRKcCojMkVSdFlScJI=w408-h272-k-no',
    address: '20 W 34th St, New York, NY 10001, United States',
    location: {
      lat: 40.7484405,
      lng: -73.9878531
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Eiffel Tower',
    description: 'One of the most famous monuments in the world.',
    imageUrl: 'https://lh5.googleusercontent.com/p/AF1QipP8E1nOUwx73CrO0pnZzHTk_O3dTyfzbN6aWnYt=w408-h256-k-no',
    address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    location: {
      lat: 48.8583701,
      lng: 2.2922926
    },
    creator: 'u2'
  }
]

router.get('/testing', (req, res, next) => {
  console.log('GET request in Places, endpoint /testing');
  res.json({                                                       //---> technically this is now actually a middleware fn !
    message: '----> It works!'
  })
});

router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid;                                     //+++>  { pid: 'p1' }
  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  })
  if(!place){
    const error = new Error('Could not find a place for the provided id!');
    error.code = 404;
    throw error;                                     //--------> keep in mind this will only work for synchronous, NOT for async !                                                                 
  }
  res.json({place});                             //------> {place: place} => {place}
});
                                                       //------> DON"T FORGET THAT THE SEQUENCE OF YOUR ROUTES MATTERS !
router.get('/user/:uid', (req, res, next) => {
  const userId = req.params.uid;                                     
  const place = DUMMY_PLACES.find(p => {
    return p.creator === userId;
  })
  if(!place){
    const error = new Error('Could not find a place for the provided user id!');
    error.code = 404;
    return next(error);                                        // needed to use next() for async !!!
  }
  res.json({place});                             //------> {place: place} => {place}
});

module.exports = router;