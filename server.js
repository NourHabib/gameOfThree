const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var game = {
    theNumber: 0,
    gameHold : false,
    gameStart : false,
    turn:false
}

app.get('/', (req, res) =>{
	res.sendfile('./public/index.html');
})

app.get('/api/newgame', (req, res) => {
    if(!game.gameHold){
       game.theNumber = Math.floor(Math.random() * 200) + 2;
    //    game.theNumber  = 2;
    }
    res.send(JSON.stringify(game));
    game.gameHold = true;
});

app.get('/api/gameStart', (req, res) => {
    game.gameStart=true;
});
app.put('/api/sendNumber', (req, res) => {
    game.theNumber = req.body.newNumber;
    game.turn = !game.turn;
});

app.get('/api/gameTurn', (req, res) => {
    res.send(JSON.stringify(game));
});

app.get('/api/gameReset', (req, res) => {
        game.theNumber = 0;
        game.gameHold = false;
        game.gameStart = false;
        game.turn = false;
        res.send('Game has been reseted');
});

app.use(express.static('public'));

var port = 3000;
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});
