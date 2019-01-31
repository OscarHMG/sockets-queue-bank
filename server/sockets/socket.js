const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

let ticketControl = new TicketControl();


//HERE OPEN THE CONNECTION WITH THE SOCKET
io.on('connection', (client) => {

    //GENERATE NEW TICKET - SEND THE NEW TURN
    client.on('nextTicket', (data, callback) => {
        let nextTicket = ticketControl.nextTurn()
        callback(nextTicket);

    });


    //WHEN CLIENT, ESTABLISH THE CONNECTION, SEND THE ACTUAL TURN

    client.emit('actualTicketTurn', {
        turn: ticketControl.getLastTicketTurn(),
        lastFourTickets: ticketControl.getLastFourTickets()
    });


    //LISTEN TO THE ATTEND TICKETS CALLS
    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                error: true,
                message: 'The info of the desktop is required'
            });
        }

        let attendTicket = ticketControl.attendTickets(data.desktop);

        //Now the perosn is attending, and new to update in the html
        callback(attendTicket);


        //NOTIFY PUBLIC SCREEN 
        client.broadcast.emit('updateScreen', {
            lastFourTickets: ticketControl.getLastFourTickets()
        })

    });



});