$(document).ready(function() {
    var socket = io();

    var ticket1 = $('#lblTicket1');
    var ticket2 = $('#lblTicket2');
    var ticket3 = $('#lblTicket3');
    var ticket4 = $('#lblTicket4');

    var desktop1 = $('#lblEscritorio1');
    var desktop2 = $('#lblEscritorio2');
    var desktop3 = $('#lblEscritorio3');
    var desktop4 = $('#lblEscritorio4');

    var tickets = [ticket1, ticket2, ticket3, ticket4];
    var desktops = [desktop1, desktop2, desktop3, desktop4];

    //GET THE ACTUAL TICKET TURN TO SHOW EVERYONE IN THE QUEUE
    socket.on('actualTicketTurn', function(data) {
        updatePublicScreen(data.lastFourTickets);
    });

    //LISTEN THE BROADCAST FROM THE SERVER TO UPDATE THE SCREEN
    socket.on('updateScreen', function(data) {
        var audioNotification = new Audio('audio/new-ticket.mp3');
        audioNotification.play();
        updatePublicScreen(data.lastFourTickets);
    });



    function updatePublicScreen(lastFourTickets) {
        for (var i = 0; i < lastFourTickets.length; i++) {
            tickets[i].text('Ticket ' + lastFourTickets[i].turnNumber);
            desktops[i].text('Desktop ' + lastFourTickets[i].desktop);
        }
    }
});