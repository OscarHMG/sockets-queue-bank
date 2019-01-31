$(document).ready(function() {
    var socket = io();


    //ESTABLISHED THE CONNECTING WITH THE SERVER
    socket.on('connect', function() {

    });

    //DISCONNECT CLIENT-SERVER CONNECTION
    socket.on('disconnect', function() {

    });

    //Obtain param 'escritorio' from the URL
    var searchParams = new URLSearchParams(window.location.search);
    if (!searchParams.has('escritorio')) {
        window.location = 'index.html';
        throw new Error('escritorio is not present in the URL');
    }

    var desktop = searchParams.get('escritorio');
    $('h1').text('Escritorio ' + desktop);


    $('button').on('click', function() {
        socket.emit('attendTicket', { desktop }, function(resp) {
            if (resp === 'No pending tickets') {
                $('small').text(resp);
                return;
            }

            $('small').text(resp.turnNumber);

            //NOTIFY PUBLIC SCREEN TO UPDATE
        });
    });
});