/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsWay = class DraughtsWay {

    static JUMP_DELAY = 250;

    constructor (index, board) {
        this.index = index;
        this.board = board;
    }

    isEqual (way, maxPoints) {
        for (let i = 0; i < maxPoints; ++i) {
            if (this.getPointCell(i) !== way.getPointCell(i)) {
                return false;
            }
        }
        return true;
    }

    isLastIndex (index) {
        return this.points.length - 1 === index;
    }

    get (index) {
        return this.points[index];
    }

    getLast () {
        return this.points[this.points.length - 1];
    }

    getPointCell (index) {
        return this.points[index]?.cell;
    }

    create (items) {
        this.points = [];
        for (const item of items) {
            this.points.push(this.createPoint(item));
        }
        this.piece = this.points[0].cell.piece;
    }

    createPoint (data) {
        const cell = this.board.getCell(data.cell);
        const capture = this.board.getCell(data.capture)?.piece;
        return new Club.DraughtsWaypoint(cell, data.crowned, capture);
    }

    cancel () {
        if (this.points.length > 1) {
            this.points[0].assignTo(this.piece);
        }
        this.points.forEach(point => point.cancel());
    }

    removeCaptures () {
        for (const point of this.points) {
            point.capture?.remove();
        }
    }

    transit () {
        let result = $.Deferred().resolve();
        this.points.forEach((point, index) => {
            result = index > 0
                ? result.then(this.transitPoint.bind(this, point, index))
                : result;
        });
        return result;
    }

    transitPoint (point, index) {
        const result = point.transit(this.piece);
        return index + 1 < this.points.length
            ? result.then(this.delayNextJump.bind(this))
            : result;
    }

    delayNextJump () {
        return Jam.AsyncHelper.setTimeout(this.constructor.JUMP_DELAY);
    }

    stringify () {
        let result = this.points[0].cell.id;
        for (let i = 1; i < this.points.length; ++i) {
            let point = this.points[i];
            result += (point.capture ? ':' : '-') + point.cell.id;
        }
        return result;
    }
};