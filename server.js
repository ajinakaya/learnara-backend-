const express = require('express');
const dotenv = require('dotenv').config({ path: './config/.env' });
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');
const path = require('path');



// database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Database not connected', err))
    
   
// middleware
app.use(express.json())
app.use(cookieParser());
app.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })

)



// routes
app.use('/', require('./routes/authroutes')),
app.use('/users', require('./routes/userroutes')),
app.use('/preferred-language', require('./routes/language/preferredLanguagerouter')); 
app.use('/language', require('./routes/language/user_languageselecteroute'));
app.use('/learning-goal', require('./routes/goal/user_learningGoalrouter'));
app.use('/set-goal', require('./routes/goal/setGoalrouter'));
app.use('/quiz', require('./routes/activityType/quizrouter'));
app.use('/chapter', require('./routes/chapterrouter'));
app.use('/audio', require('./routes/activityType/audiorouter'));
app.use('/video', require('./routes/activityType/videorouter'));
app.use('/sublesson', require('./routes/sublessonrouter'));
app.use('/flashcard', require('./routes/activityType/flashcardrouter'));
app.use('/course', require('./routes/courserouter'));   
app.use('/userprogress', require('./routes/progress/userprogressrouter'));
app.use('/userprogress', require('./routes/progress/sublessonrouter'));
app.use('/userprogress', require('./routes/progress/dailystudyrouter'));
app.use('/userprogress', require('./routes/progress/activityprogressrouter'));
app.use('/activity', require('./routes/activityType/activityrouter'));
app.use('/notifications', require('./routes/notificationrouter'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const port = 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`))
