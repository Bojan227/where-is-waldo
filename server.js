const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const waldoRoutes = require('./routes/waldoRoutes');

require('dotenv').config();

const app = express();
const PORT = 3001;

const connectionString = process.env.MONGO_KEY;

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Database');
  })
  .catch(err => console.log(err));

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/where-is-waldo', waldoRoutes);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
