/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('./BaseAction');

module.exports = class RejectDrawAction extends Base {

    validate () {
        if (!this.validateBase()) {
            return false;
        }
        if (!this.isLastEvent('offerDraw')) {
            return this.setError('Offer not found');
        }
        if (this.isMoverAndNotBot() ) {
            return this.setError('Player cannot reject a draw');
        }
        return true;
    }

    execute () {
        const pos = this.hand !== this.play.mover
            ? this.hand.pos
            : this.opponent.pos;
        this.play.addEvent('rejectDraw', [pos]);
    }
};