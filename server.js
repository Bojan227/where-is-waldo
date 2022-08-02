const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const waldoRoutes = require('./routes/waldoRoutes');

require('dotenv').config();

const app = express();
const port = 3001;

const connectionString = process.env.MONGO_KEY;

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Database');
  })
  .catch(err => console.log(err));
// .then(client => {

// console.log('Connected to Database')
// const db = client.db('where-is-waldo')
// const scoreCollection = db.collection('scores')

app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', waldoRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/dist/index.html')

// })

// app.get('/game', (req, res)=>{
//   res.redirect('/')

// })

// app.get('/leaderboard', (req, res)=>{
//   res.redirect('/')

// })

// app.get('/level/:id', (req, res)=>{
//   const id = req.params.id
//    db.collection('levels').find().toArray()
//     .then(results=>{
//         res.json({...results[parseInt(id)][id], level: id})
//     }).catch(err=>console.log(err))
// })

// app.get('/times', (req, res)=>{
//   scoreCollection.find().toArray()
//     .then(data=>{
//       res.status(200).json(data)
//     })

// })

// app.post('/save', (req, res)=>{
//   console.log(req.body)

//   scoreCollection.insertOne(req.body)
//     .then(()=>{
//       res.status(200).json({msg: 'Your score is successfully saved!'})

//     })
//     .catch(err=>console.log(err))

// })

// app.post('/timer', (req, res)=>{
//   const endTime = req.body.time
//   console.log(endTime)
//   db.collection('timer').find().toArray()
//     .then(result=>{
//       const start = result[0].time
//       console.log(start)
//       res.status(200).json({time: endTime - start})
//     })
// } )

// app.patch('/timer', (req, res)=>{
//     const time = req.body.time
//     console.log(time)
//     db.collection('timer').findOneAndUpdate(
//       {type: 'time'},
//       {
//         $set: {
//           time: time,
//         }
//       }
//     )
//       .then(()=>{

//         res.status(200).json({msg: 'good'})
//       })

// })

// app.post('/coord', (req, res)=>{
//     const {x, y, ch, lvl} = req.body
//     db.collection('coordinates').find().toArray()

//       .then(results=>{
//         let char = results[lvl][lvl].char.find(el=>el.name === ch)

//         if((x < (parseInt(char.x) + 3) && x > (parseInt(char.x) - 3)) &&
//             (y < (parseInt(char.y) + 3) && y > (parseInt(char.y) - 3)))
//         {
//           return res.status(200).json({char: char.name})
//         }

//         return res.status(404).json({msg: "You mised!" })

//       })

// })

// })
// .catch(error => console.error(error))
