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
    console.log('A user connected');
});


server.listen(9000, () => {
    console.log('Server is live');
});