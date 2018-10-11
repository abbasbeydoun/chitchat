const express = require('express');

const app = express();

const http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);


const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const bodyParser = require('body-parser');
app.use(bodyParser.json());


io.on('connection', (socket) => {
    console.log('user connected');
});


server.listen(8000, () => {
    console.log('Server started!');
});

app.route('/api/cats').get((req, res) => {


    res.send({ message: 'All cats returned' });

});


app.route('/api/cats/:name').get((req, res) => {

    const requestedCatName = req.params['name'];

    res.send({ name: requestedCatName });

});

app.route('/api/cats').post((req, res) => {
    res.send(201, req.body);
});