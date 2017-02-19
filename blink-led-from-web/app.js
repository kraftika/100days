'use strict';

const five = require('johnny-five');
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {
    client.on('join', function(handshake) {
        console.log('Handshake: ' + handshake);
    });

    client.on('state', function(data) {
        console.log('I received: ' + data.state);
    });
});

const port = process.env.PORT || 5000;
server.listen(port);
console.log('Server listenning');