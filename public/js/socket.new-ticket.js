//Command to establish the connection


// ============================================
// ================= CLIENT SIDE ==============
// ============================================
var lblNewTicket = $("#lblNuevoTicket");

$(document).ready(function() {
    var socket = io();

    //ESTABLISHED THE CONNECTING WITH THE SERVER
    socket.on('connect', function() {
        console.log('Connected with server');



    });



    //DISCONNECT CLIENT-SERVER CONNECTION
    socket.on('disconnect', function() {
        console.log('Disconnect with server');
    });

    //WHEN THE USER IS CONNECTED, OBTAIN THE ACTUAL TURN FROM THE SERVER
    socket.on('actualTicketTurn', function(data) {
        lblNewTicket.text(data.turn);
    });


    //EVENT WITH THE BUTTON - WHEN USER PRESS THE BUTTON, GENERATE THE NEXT TICKET
    $('button').on('click', function() {
        console.log('Generating new ticket..');


        socket.emit('nextTicket', null, function(resp) {
            lblNewTicket.text(resp);
        });
    });

});