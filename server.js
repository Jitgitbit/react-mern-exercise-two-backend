const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');

const app = express();
const port = process.env.PORT || 5000;

app.use(placesRoutes);

app.listen(port, () => console.log(`Listening on: ${port}, endpoint /testing is supported!`));  // start Node + Express server on port 5000