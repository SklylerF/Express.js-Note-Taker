const express = require('express');

const PORT =  process.env.PORT||3001;
const tests = require('./db/db.json');

const path = require('path');

const app = express()
// this is our middlewear
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

// returning anything from db.json file
app.get('/api/notes', (req, res)=> {
    console.log('get is working ')
    res.send(tests)
});

// gets the notes.html
app.get('/notes', (req, res)=> {
    console.log('get is working');
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// post request
app.post('/api/notes', (req,res) =>{
    const body = req.body
    tests.push(body)
    res.send(tests)
});


// creates a sever
app.listen (PORT, () =>{
    console.log(`we are listening on this ${PORT}`);
})