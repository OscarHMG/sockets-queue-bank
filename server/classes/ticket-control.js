const fs = require('fs');
const { Ticket } = require('./ticket');

class TicketControl {

    constructor() {
        this.lastTurn = 0;
        this.today = new Date().getDate();
        this.tickets = [];

        let data = require('../data/data.json');

        //Every time create new ticket verify if I neet to 
        // restore the turn number or continue
        if (data.today === this.today) {
            this.lastTurn = data.lastTurn;
            this.tickets = data.tickets;

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
            tickets: this.tickets
        };

        let dataString = JSON.stringify(data);
        fs.writeFileSync('./server/data/data.json', dataString);

        console.log('System was restarted');

    }

    getLastTicketTurn() {
        return `Ticket ${ this.lastTurn }`;

    }
}

module.exports = {
    TicketControl
}