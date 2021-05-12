const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

//Middlewares
app.use(express.json());


//DB Setup
mongoose.connect(process.env.DATABASE_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
})

const db = mongoose.connection
db.once('open', () => {
   console.log('Connected to database...')
})
db.on('error', error => {
   console.error('Error')
})

//Set up Routes
app.use('/', async(req, res) => {
   res.send('Go to /users')
})

app.use('/users', require('./routes/users'));

//Error Handling
app.use((req, res, next) => {
   const error = new Error('Not found!')
   error.status = 404
   next(error)
})

app.use((error, req, res, next) => {
   res.status(error.status || 500)
   res.json({
       error: {
           message: error.message
       }
   })
})

//Port config
PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})