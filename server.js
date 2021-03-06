const express = require('express');

const app = express();

const MongoClient = require('mongodb').MongoClient;

const getRandomValues = require('get-random-values');

let db;

// TODO: Store mongo username and password in safe place and retrieve from there

MongoClient.connect('mongodb://abbasbeydoun95:mlabpass69@ds129823.mlab.com:29823/storage', { useNewUrlParser: true }  , (err, database) => {

    if (err) return console.log(err);
    db = database.db('storage')

});

// RFC4122 compliant UUID generator

uuidv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
};

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

    /*
    1- Generate user UUID string
    2- Check if that user exists, if it does, generate new user UUID string, check if that exists, etc ...
    3 - If user does not exist, add to list of users in db
     */


    const generateUser = () => {

        let USERUUID = 'User'+uuidv4();

        db.collection('connected_users').findOne({user: USERUUID}).then((returnedUser) => {


            while(returnedUser !== null){
                generateUser();
            }

            // Unique userID confirmed and generated, add to database

            db.collection('connected_users').insertOne({user: USERUUID}, (err, result) => {

                if(err) console.log(err);
                socket.emit('uuidassign', USERUUID);

            });


        });

    };


    generateUser();

    socket.on('newmessage', (message) => {
        io.emit('newmessage', message);
    });


});




server.listen(9000, () => {
    console.log('Server is live');
});