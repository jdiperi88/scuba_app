const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const requireAuth = require('./routes/auth_routes')

//middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//db  and name is auth

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/auth', {
    useMongoClient: true,
    /* other options */
  });
// app setup

//server setup

const port = process.env.Port || 4000
const server = http.createServer(app);
app.listen(port);
console.log(`Sever listening on ${port}`)

app.get('/',requireAuth,(req, res)=>{
  console.log(res)
  res.send({message: 'Super secret code 123'})
})

const authRoutes = require('./routes/auth_routes');
app.use('/auth',authRoutes);


