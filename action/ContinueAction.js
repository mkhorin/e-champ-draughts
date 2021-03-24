/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('./BaseAction');

module.exports = class ContinueAction extends Base {

    validate () {
        if (!this.validatePlayer()) {
            return false;
        }
        if (!this.play.finished) {
            return this.setError('Round is not over');
        }
        if (this.hand.turned) {
            return this.setError('Player is ready');
        }
        return true;
    }

    execute () {
        this.play.setPlayerReady(this.hand);
        if (this.play.arePlayersReady()) {
            this.play.startNextRound();
        }
    }
};