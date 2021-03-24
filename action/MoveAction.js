/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('./BaseAction');

module.exports = class MoveAction extends Base {

    validate () {
        if (!this.validateBase() || !this.validateMover()) {
            return false;
        }
        if (this.isLastEvent('offerDraw')) {
            return this.setError('A draw offer in progress');
        }
        this.way = this.play.ways.get(Number(this.data.way));
        if (!this.way) {
            return this.setError('Way not found');
        }
        return true;
    }

    execute () {
        this.way.execute();
        this.play.addEvent('move', [this.play.mover.pos, this.data.way]);
        this.play.nextTurn();
    }
};