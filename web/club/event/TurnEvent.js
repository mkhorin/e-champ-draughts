/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsTurnEvent = class DraughtsTurnEvent extends Club.DraughtsEvent {

    static PROCESS_DELAY = 250;

    processNormal () {
        this.execute();
        this.play.showTurn();
        this.finishAfterMotion(this.constructor.PROCESS_DELAY);
    }

    processHidden () {
        this.execute();
        this.finish();
    }

    execute () {
        this.play.setMover(this.data.mover);
        this.play.ways.create(this.data.ways);
    }
};
