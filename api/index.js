require("dotenv").config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000; 
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const blogRouter = require('./routes/blogRoutes');
const {checkAuthe} = require('./middlewares/checkAuth');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

app.use(cors({origin: 'http://localhost:5173', credentials: true }));
app.use(express.json())
app.use(cookieParser());
app.use(express.static(path.resolve('./public')));


app.use(checkAuthe)

app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.listen(PORT, ()=>{console.log(`App listening @ ${PORT}`)}) 