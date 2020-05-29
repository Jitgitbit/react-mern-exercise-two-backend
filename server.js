const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on: ${port}, endpoint /... is supported`));  // start Node + Express server on port 5000