const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
                                         //------> the sequence of ANY middleWare is of major importance !!! They will be parsed from top to bottom !!!
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route', 404);
  throw error;                          //-----------> throw error because now it's still synchronous !
});

app.use((error, req, res, next) => {
  if(res.headerSent){
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose
  .connect('mongodb+srv://thierrydk:mySecretPassword@cluster0-qcxiw.mongodb.net/phoenixplaces?retryWrites=true&w=majority')
  .then(() => {
    app.listen(port, () => console.log(`Listening on: ${port}, endpoint /testing is supported!`));  // start Node + Express server on port 5000
  })
  .catch(err => {
    console.log(err);
  });