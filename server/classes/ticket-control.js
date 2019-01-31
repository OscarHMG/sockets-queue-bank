const fs = require('fs');
const { Ticket } = require('./ticket');

class TicketControl {

    constructor() {
        this.lastTurn = 0;
        this.today = new Date().getDate();
        this.tickets = [];

        //This tickets are attending right now
        this.lastFourTickets = [];

        let data = require('../data/data.json');

        //Every time create new ticket verify if I neet to 
        // restore the turn number or continue
        if (data.today === this.today) {
            this.lastTurn = data.lastTurn;
            this.tickets = data.tickets;
            this.lastFourTickets = data.lastFourTickets;
        } else {
            this.resetTurn();
            //When reset the last one, need to reset the pending tickets
        }
    }



    /**
     * Reset the turn.
     */
    resetTurn() {
        this.lastTurn = 0;
        this.tickets = [];
        this.lastFourTickets = [];
        this.saveTurns();
    }


    nextTurn() {
        this.lastTurn = this.lastTurn + 1;
        //When the last turn is updated, a new ticket is created and then save the actual status
        let ticket = new Ticket(this.lastTurn, null);
        this.tickets.push(ticket);
        this.saveTurns();

        return `Ticket ${ this.lastTurn }`;
    }

    //Mantain the turns persistant
    saveTurns() {
        let data = {
            lastTurn: this.lastTurn,
            today: this.today,
            tickets: this.tickets,
            lastFourTickets: this.lastFourTickets
        };

        let dataString = JSON.stringify(data);
        fs.writeFileSync('./server/data/data.json', dataString);

        console.log('System was restarted');

    }

    getLastTicketTurn() {
        return `Ticket ${ this.lastTurn }`;

    }

    getLastFourTickets() {
        return this.lastFourTickets;

    }

    attendTickets(desktop) {
        if (this.tickets.length === 0)
            return 'No pending tickets';


        let numTicket = this.tickets[0].turnNumber;
        //Delete 1st element, because now is attended
        this.tickets.shift();

        let attendTickets = new Ticket(numTicket, desktop);
        //The last ticket are now added in the attending tickets (put in the 1st place in the array)
        this.lastFourTickets.unshift(attendTickets);

        //REMEMBER: ONLY 4 DESKTOPS

        if (this.lastFourTickets.length > 4)
            this.lastFourTickets.splice(-1, 1);

        this.saveTurns();

        return attendTickets;

    }
}

module.exports = {
    TicketControl
}