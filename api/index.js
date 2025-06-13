const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('./models/User.js');
const app = express();


const jwtSecret = 'ofjdlvnjvnvsjdoijviansvnlzk';

require('dotenv').config()
app.use(express.json());
app.use(cors({
    credentials: true, 
    origin: 'http://localhost:5173' // Adjust this to your frontend URL
}));

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);


app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try{        
        const hashedPassword = bcrypt.hashSync(password, 10);
        const userDoc = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.json (userDoc);
    } catch(err) {
        console.error(err);
        res.status(422).json(err);
    }
});

//beDjZfhIHP18HaYA

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if(passOk){
            jwt.sign({email: userDoc.email, id:userDoc._id}, jwtSecret, {}, (err, token) =>{
                if(err) throw err;
                res.cookie('token', token).json('pass ok');
            });
            
        } else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('not found');
    }
});


app.listen(4000, () => {
    console.log("Server is running on port 4000");
});

