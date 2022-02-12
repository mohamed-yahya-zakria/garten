const express = require('express');
const cors = require('cors')
const app = express();
const plantRouter = require('./routes/plantRouter')
const userRouter = require('./routes/userRouter')
const fBookRouter = require('./routes/fBookRouter')

const session = require('express-session')

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(express.static('public'));

app.use(cors())
require('dotenv').config()
//should be after require('dotenv').config() .it was my wrong
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const DB_NAME = process.env.DB_NAME;
const DB_LINK = process.env.MONGO_LINK + DB_NAME
mongoose.connect(DB_LINK, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => console.log('MongoDB database is Successfully connected'))
    .catch(() => console.log('Database connection failed!'))
mongoose.set('useFindAndModify', false);
//declare the port

app.get('/test', (req, res) => {
    res.json('it works')
})

/*  app.get('/data',(req,res)=>{
     res.json('hello any')
 }) */
app.use('/plant', plantRouter)
app.use('/user', userRouter)
app.use('/user', fBookRouter)

app.listen(PORT, () => {
    console.log('Server is running...')
})