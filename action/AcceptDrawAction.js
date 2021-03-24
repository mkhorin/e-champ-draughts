/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('./BaseAction');

module.exports = class AcceptDrawAction extends Base {

    validate () {
        if (!this.validateBase()) {
            return false;
        }
        if (!this.isLastEvent('offerDraw')) {
            return this.setError('Offer not found');
        }
        if (this.isMoverAndNotBot()) {
            return this.setError('Player cannot accept a draw');
        }
        return true;
    }

    execute () {
        this.play.endRound();
    }
};