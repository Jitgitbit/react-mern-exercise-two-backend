const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
                                         //------> the sequence of ANY middleWare is of major importance !!! They will be parsed from top to bottom !!!
app.use('/api/places', placesRoutes);

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

app.listen(port, () => console.log(`Listening on: ${port}, endpoint /testing is supported!`));  // start Node + Express server on port 5000