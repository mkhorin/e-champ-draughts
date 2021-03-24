/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('./BaseAction');

module.exports = class OfferDrawAction extends Base {

    validate () {
        if (!this.validateBase() || !this.validateMover()) {
            return false;
        }
        if (!this.isLastEvent('turn')) {
            return this.setError('You can offer a draw after a move');
        }
        return true;
    }

    execute () {
        this.play.addEvent('offerDraw', [this.hand.pos]);
    }
};