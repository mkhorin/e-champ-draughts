/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsMoveEvent = class DraughtsMoveEvent extends Club.DraughtsEvent {

    constructor () {
        super(...arguments);
        this.way = this.play.ways.get(this.data[1]);
        this.play.moveList.add(this.way);
    }

    processNormal () {
        if (this.play.mover.lastWay === this.way) {
            return this.processHidden();
        }
        this.way.transit().then(() => {
            this.way.removeCaptures();
            this.finish();
        });
    }

    processHidden () {
        this.way.removeCaptures();
        this.way.getLast().assignTo(this.way.piece);
        this.finish();
    }
};
