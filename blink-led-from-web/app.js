'use strict';

const five = require('johnny-five');
const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/'));

var board = new five.Board();
var led = 3;

board.on('ready', function() {
    led = five.Led(11);
});

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {
    client.on('join', function(handshake) {
        console.log('Handshake: ' + handshake);
    });

    client.on('state', function(data) {
        console.log(data.state);
        if (data && led) {
            switch(data.state) {
                case 'on':
                    led.on();
                    break;
                case 'pulse':
                    led.pulse(300);
                    break;
                case 'strobe':
                    led.strobe(600);
                    break;
                case 'fade':
                    led.fadeIn();
                    setTimeout(function() {
                        led.fadeOut();
                    }, 2000);
                    break;
                default: 
                    led.stop().off();
            }
        }
    });
});

console.log(process.env.PORT);

const port = process.env.PORT || 5000;
server.listen(port);
console.log('Server listenning');