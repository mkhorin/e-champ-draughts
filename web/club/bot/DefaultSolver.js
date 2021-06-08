/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

Club.DraughtsDefaultSolver = class DraughtsDefaultSolver {

    static FINAL_DELAY = 250;

    constructor (player) {
        this.player = player;
        this.play = player.play;
        this.params = player.data.params;
        this.startTime = Date.now();
    }

    clear () {
        this.done = null;
    }

    resolveMove (done) {
        this.done = done;
        const index = Jam.Helper.random(0, this.play.ways.count() - 1);
        this.complete(index);
    }

    resolveDraw (done) {
        this.done = done;
        const accepted = Jam.Helper.random(0, 1) === 0;
        this.complete(accepted);
    }

    complete (result) {
        const delay = this.constructor.FINAL_DELAY - (Date.now() - this.startTime);
        return setTimeout(() => this.done?.(result), delay);
    }
};