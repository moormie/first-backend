const express = require('express')
const bodyParser = require('body-parser')

const placesRoutes = require("./routes/places-routes");
const HttpError = require('./models/http-error');

const app = express()

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);

app.use((req, res, next) => {
  throw new HttpError("Nothing is here", 404);
})

// error handling middleware
app.use((error, req, res, next) => {
  if(res.headerSent) {
    return next(error)
  }

  res.status(error.code || 500)
  res.json({
    message: error.message || 'Unknown error'
  })
})

app.listen(5001)