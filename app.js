require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let winControl = 'random'; 

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/control', (req, res) => {
    res.render('control');
});

app.get('/set_control/0', (req, res) => {
    winControl = 'win';  
    res.send('Success! Control set to Win.');
});

app.get('/set_control/1', (req, res) => {
    winControl = 'lose';  
    res.send('Success! Control set to Lose.');
});

app.get('/set_control/2', (req, res) => {
    winControl = 'random';  
    res.send('Success! Control set to Random.');
});

app.get('/get-color', (req, res) => {
    let color = '#FFFFFF';  
    if (winControl === 'win') {
        color = '#006A4E'; 
    } else if (winControl === 'lose') {
        color = '#AA0000';  
    } else if (winControl === 'random') {
        const colors = ['#006A4E', '#AA0000'];
        color = colors[Math.floor(Math.random() * colors.length)];  
    }
    res.json({color});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});