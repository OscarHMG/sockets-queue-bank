const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();


//HERE OPEN THE CONNECTION WITH THE SOCKET
io.on('connection', (client) => {

    //GENERATE NEW TICKET - SEND THE NEW TURN
    client.on('nextTicket', (data, callback) => {
        let nextTicket = ticketControl.nextTurn()
        console.log(nextTicket);
        callback(nextTicket);

    });


    //WHEN CLIENT, ESTABLISH THE CONNECTION, SEND THE ACTUAL TURN

    client.emit('actualTicketTurn', {
        turn: ticketControl.getLastTicketTurn()
    });

});