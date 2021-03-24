/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('./BaseAction');

module.exports = class ResignAction extends Base {

    validate () {
        if (!this.validateBase() || !this.validateMover()) {
            return false;
        }
        if (this.isLastEvent('offerDraw')) {
            return this.setError('A draw offer in progress');
        }
        return true;
    }

    execute () {
        this.play.endRound(this.hand, {resigned: true});
    }
};