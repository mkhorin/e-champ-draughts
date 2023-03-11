/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

module.exports = class Hand {

    constructor (player, play) {
        this.play = play;
        this.player = player;
        this.pos = player.pos;
        this.color = this.pos
            ? play.constructor.DARK
            : play.constructor.LIGHT;
        this.turned = false;
    }

    isBot () {
        return this.player.isBot();
    }

    isLight () {
        return this.color === this.play.constructor.LIGHT;
    }

    getData () {
        const data = this.player.getData();
        data.color = this.color;
        return data;
    }

    addWin () {
        return this.player.addWin();
    }

    addLosing () {
        return this.player.addLosing();
    }

    addDraw () {
        return this.player.addDraw();
    }
};