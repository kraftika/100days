(function() { 
    let socket = io.connect(window.location.hostname + ':' + 5000);

    function emitState(event) {
        console.log('event: ', event.target.id);
        socket.emit('state', {  
                state: event.target.id 
            }
        );
    }

    let onButton = document.getElementById('on');
    let pulseButton = document.getElementById('pulse');
    let strobeButton = document.getElementById('strobe');
    let offButton = document.getElementById('off');

    onButton.addEventListener('click', emitState, false);
    pulseButton.addEventListener('click', emitState, false);
    strobeButton.addEventListener('click', emitState, false);
    offButton.addEventListener('click', emitState, false);

    socket.on('connect', function(data) {
        socket.emit('join', 'Client is connected');
    });
}());