(function() { 
    var socket = io.connect(window.location.hostname + ':' + 5000);

    function emitState(state) {
        console.log(state);

    }

    var onButton = document.getElementById('on');
    var pulseButton = document.getElementById('pulse');

    onButton.addEventListener('click', emitState('on'));
    pulseButton.addEventListener('click', emitState('pulse'));

    socket.on('connect', function(data) {
        socket.emit('join', 'Client is connected');
    });
}());