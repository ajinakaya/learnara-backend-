const express = require('express');
const dotenv = require('dotenv').config({ path: './config/.env' });
const { mongoose } = require('mongoose')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();


// database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Database not connected', err))

// middleware
app.use(express.json())
app.use(cookieParser());



app.use('/', require('./routes/authroutes'))



const port = 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`))
