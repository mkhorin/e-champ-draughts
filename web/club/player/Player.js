/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsPlayer = class DraughtsPlayer {

    static MESSAGE_READY = 'Ready';
    static MESSAGE_THINK = 'Thinking...';
    static MESSAGE_WAIT = 'Waiting...';

    constructor (play) {
        this.play = play;
        this.board = play.board;
        this.$container = this.getContainer();
        this.$message = this.$container.find('.player-message');
        this.$won = this.$container.find('.player-stat-won');
        this.$lost = this.$container.find('.player-stat-lost');
        this.$drawn = this.$container.find('.player-stat-drawn');
    }

    getContainer () {}

    getOppositeColor () {
        return this.play.constructor.getNextColor(this.color);
    }

    clear () {
        this.deactivate();
    }

    activate () {
        this.active = true;
    }

    deactivate () {
        this.active = false;
        this.setMessage(this.constructor.MESSAGE_WAIT);
    }

    start (data) {
        this.data = data;
        this.color = data.color;
        this.ready = false;
        this.$won.html(data.won);
        this.$lost.html(data.lost);
        this.$drawn.html(data.drawn);
        this.$container.attr('data-type', this.data.type);
        this.setName();
    }

    setName () {
        this.name = this.play.resolvePlayerName(this.data);
        this.$container.find('.player-name')
            .html(this.name)
            .attr('title', this.name);
    }

    setReady (state) {
        this.ready = state;
    }

    setDraw () {
        this.setEndStatus('draw');
        this.incrementStatCounter(this.$drawn);
    }

    setLoser () {
        this.setEndStatus('loser');
        this.incrementStatCounter(this.$lost);
    }

    setWinner () {
        this.setEndStatus('winner');
        this.incrementStatCounter(this.$won);
    }

    setEndStatus (status) {}

    incrementStatCounter ($stat) {
        $stat.html(Number($stat.html()) + 1);
    }

    updateMessage () {
        this.setMessage(this.getMessage());
    }

    getMessage () {
        const event = this.play.events.getLast();
        if (event[0] === Club.DraughtsEvent.OFFER_DRAW) {
            return event[1][0] === this.pos
                ? this.constructor.MESSAGE_WAIT
                : this.constructor.MESSAGE_THINK;
        }
        if (this.play.isFinished()) {
            return this.ready
                ? this.constructor.MESSAGE_READY
                : this.constructor.MESSAGE_THINK;
        }
        return this.play.mover === this
            ? this.constructor.MESSAGE_THINK
            : this.constructor.MESSAGE_WAIT;
    }

    setMessage (message) {
        this.$message.html(this.play.translate(message));
    }
};