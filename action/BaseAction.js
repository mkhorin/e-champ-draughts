/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('e-champ/arena/Action');

module.exports = class BaseAction extends Base {

    constructor (config) {
        super(config);
        this.hand = this.play.hands[this.player.pos];
        this.opponent = this.play.getNextHand(this.hand);
    }

    isMover () {
        return this.hand === this.play.mover;
    }

    isMoverAndNotBot () {
        return this.hand === this.play.mover && !this.opponent.isBot();
    }

    isLastEvent (name) {
        return this.getLastEvent()?.name === name;
    }

    getLastEventName () {
        return this.getLastEvent()?.name;
    }

    getLastEvent () {
        return this.play.events.getLast();
    }

    validateBase () {
        return this.validatePlayer() && this.validateActiveRound();
    }

    validateActiveRound () {
        return this.play.finished
            ? this.setError('Round is over now')
            : true;
    }

    validateMover () {
        return this.hand !== this.play.mover && !this.play.mover.isBot()
            ? this.setError('Player cannot act now')
            : true;
    }
};