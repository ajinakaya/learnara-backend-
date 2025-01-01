const express = require('express');
const dotenv = require('dotenv').config({ path: './config/.env' });
const { mongoose } = require('mongoose')
const cookieParser = require('cookie-parser');
const app = express();


// database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Database not connected', err))
    

// middleware
app.use(express.json())
app.use(cookieParser());


// routes
app.use('/', require('./routes/authroutes')),//Authentication routes
app.use('/preferred-language', require('./routes/preferredLanguageRouter')); 
app.use('/language', require('./routes/languageselectedRoute'));
app.use('/learning-goal', require('./routes/learningGoalRouter'));
app.use('/set-goal', require('./routes/setGoalRouter'));
app.use('/quiz', require('./routes/quizrouter'));
app.use('/chapter', require('./routes/chapterrouter'));
app.use('/audio', require('./routes/audiorouter'));
app.use('/video', require('./routes/videorouter'));
app.use('/lesson', require('./routes/sublessonrouter'));
app.use('/flashcard', require('./routes/flashcardrouter'));
app.use('/courser', require('./routes/courserouter'));   



const port = 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`))
