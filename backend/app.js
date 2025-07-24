const express = require('express')
require('dotenv').config()
const db = require('./config/db')
const Note = require('./models/notes')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes')
const notesRoutes = require('./routes/notesRoutes');
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // or your frontend domain
    credentials: true
}));

app.use('/auth', authRoutes)
app.use('/notes', notesRoutes)
app.use('/user',userRoutes)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`);
}); 
