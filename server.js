const express = require('express');

const PORT =  process.env.PORT||3001;
const tests = require('./db/db.json');
const uniqid = require('uniqid')

const path = require('path');
const fs = require('fs');
const { json } = require('express');

const app = express()
// this is our middlewear
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

// directs to index
app.get('/', (req,res) => {
    console.log('get is working');
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

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
    const newNote = {title:req.body.title, text:req.body.text, id:uniqid() }
    tests.push(newNote)
    fs.writeFile('./db/db.json', JSON.stringify(tests), (err)=>{
        console.log('this did not work');
    })
    res.send(tests)
});

// directs to index
app.get('*', (req,res) => {
    console.log('get is working');
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// creates a sever
app.listen (PORT, () =>{
    console.log(`we are listening on this ${PORT}`);
});