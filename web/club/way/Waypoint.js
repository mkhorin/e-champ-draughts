/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsWaypoint = class DraughtsWaypoint {

    constructor (cell, crowned, capture) {
        this.cell = cell;
        this.crowned = crowned;
        this.capture = capture;
    }

    assignTo (piece) {
        piece.setCrown(this.crowned);
        piece.setCell(this.cell);
    }

    cancel () {
        this.capture?.toggleCaptured(false);
    }

    transit (piece) {
        return piece.transit(this.cell).done(() => this.assignTo(piece));
    }
};