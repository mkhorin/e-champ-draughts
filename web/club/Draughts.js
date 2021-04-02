/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

Club.Draughts = class Draughts extends Club.Play {

    static ACTION_ACCEPT_DRAW = 'acceptDraw';
    static ACTION_CONTINUE = 'continue';
    static ACTION_MOVE = 'move';
    static ACTION_OFFER_DRAW = 'offerDraw';
    static ACTION_REJECT_DRAW = 'rejectDraw';
    static ACTION_RESIGN = 'resign';

    static DARK = 'dark';
    static LIGHT = 'light';

    static getNextColor (color) {
        return color === this.LIGHT ? this.DARK : this.LIGHT;
    }

    constructor () {
        super(...arguments);
        this.setGame('draughts');
        this.board = new Club.DraughtsBoard(this);
        this.pieces = new Club.DraughtsPieces(this);
        this.ways = new Club.DraughtsWays(this);
        this.moveList = new Club.DraughtsMoveList(this);
        this.master = this.createMaster();
        this.opponent = this.createOpponent();
        this.events = this.createEvents();
        this.countdown = this.createCountdown();
        $(window).resize(this.onResizeWindow.bind(this));
        this.onResizeWindow();
    }

    createMaster () {
        return new Club.DraughtsMaster(this);
    }

    createOpponent () {
        return new Club.DraughtsOpponent(this);
    }

    createEvents () {
        return super.createEvents({
            BaseEvent: Club.DraughtsEvent,
            onHandledEvents: this.onHandledEvents.bind(this),
            onHandledHiddenEvents: this.onHandledHiddenEvents.bind(this)
        });
    }

    createCountdown () {
        return new Club.Countdown({
            refreshInterval: 200,
            $element: this.find('.countdown')
        });
    }

    onMessage (data) {
        super.onMessage(data);
        this.events.add(data.events);
        this.events.process();
        this.startCountdown();
    }

    onHandledHiddenEvents () {
        this.page.toggleLoading(false);
        this.toggleClass('hidden', false);
        this.pieces.resize();
    }

    onHandledEvents () {
        this.master.update();
        this.opponent.update();
    }

    onResizeWindow () {
        this.board.resize();
        this.pieces.resize();
    }

    isFinished () {
        return this.finished;
    }

    start (data) {
        super.start(...arguments);
        this.master.pos = data.pos;
        this.opponent.pos = (data.pos + 1) % 2;
        this.opposite = data.pos !== 0;
        this.toggleClass('opposite', this.opposite);
        this.toggleClass('hidden', true);
        this.page.toggleLoading(true);
        this.events.clear();
    }

    resolveLastHiddenEventIndex () {
        return this.events.count() - 1;
    }

    startRound (data) {
        this.clear();
        this.roundData = data;
        this.round = data.round;
        this.options = data.options;
        this.mover = null;
        this.master.start(data.players[this.master.pos]);
        this.opponent.start(data.players[this.opponent.pos]);
        this.board.createCells();
        this.pieces.create(data.pieces);
        this.toggleRoundEnd(false);
        this.startCountdown();
        this.resolveGameLabel();
    }

    resolveGameLabel () {
        if (this.options.losing) {
            this.setGameLabel(this.getOptionAttr('losing').label);
        }
    }

    clear () {
        super.clear();
        this.board.clear();
        this.pieces.clear();
        this.master.clear();
        this.opponent.clear();
        this.countdown.clear();
        this.moveList.clear();
    }

    getPlayer (pos) {
        return this.master.pos === pos
            ? this.master
            : this.opponent.pos === pos
                ? this.opponent
                : null;
    }

    setMover (pos) {
        this.mover = this.getPlayer(pos);
    }

    toggleMaster (state) {
        this.toggleClass('master', state);
    }

    showTurn () {}

    startCountdown () {
        const timeout = this.options?.actionTimeout * 1000;
        this.countdown.start(timeout || 0, this.messageTimestamp);
    }

    toggleRoundEnd (ended, resigned = false) {
        this.finished = ended;
        this.toggleClass('end', ended);
        this.toggleClass('resigned', resigned);
    }

    updatePlayerMessages () {
        this.master.updateMessage();
        this.opponent.updateMessage();
    }

    exportData () {
        return Object.assign(super.exportData(), {
            events: this.events.items,
            pos: this.master.pos
        });
    }
};