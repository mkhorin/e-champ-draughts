/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsEvent = class DraughtsEvent {

    static END = 'end';
    static MOVE = 'move';
    static OFFER_DRAW = 'offerDraw';
    static READY = 'ready';
    static REJECT_DRAW = 'rejectDraw';
    static ROUND = 'round';
    static TURN = 'turn';

    static getClass (name) {
        switch (name) {
            case this.END: return Club.DraughtsEndEvent;
            case this.MOVE: return Club.DraughtsMoveEvent;
            case this.OFFER_DRAW: return Club.DraughtsOfferDrawEvent;
            case this.READY: return Club.DraughtsReadyEvent;
            case this.REJECT_DRAW: return Club.DraughtsRejectDrawEvent;
            case this.ROUND: return Club.DraughtsRoundEvent;
            case this.TURN: return Club.DraughtsTurnEvent;
        }
    }

    constructor (params) {
        this.play = params.play;
        this.board = this.play.board;
        this.hidden = params.hidden;
        this.data = params.data;
        this.player = this.getPlayer(this.data?.[0]);
        this.index = params.index;
        this.onHandled = params.onHandled;
    }

    getPlayer (pos) {
        return this.play.getPlayer(pos);
    }

    process () {
        this.hidden ? this.processHidden() : this.processNormal();
    }

    processHidden () {
        this.finish();
    }

    processNormal () {
        this.finish();
    }

    finish () {
        this.onHandled(this);
    }

    finishAfterMotion (delay = 0) {
        this.play.motion.done(() => setTimeout(this.finish.bind(this), delay));
    }
};
