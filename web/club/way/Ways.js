/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsWays = class DraughtsWays {

    constructor (play) {
        this.play = play;
        this.board = play.board;
        this.ways = [];
    }

    count () {
        return this.ways.length;
    }

    get (index) {
        return this.ways[index];
    }

    getByPiece (piece) {
        for (const way of this.ways) {
            if (way.piece === piece) {
                return way;
            }
        }
    }

    getByCell (cell, currentWay, pointIndex) {
        if (currentWay.getPointCell(pointIndex) === cell) {
            return currentWay;
        }
        for (const way of this.ways) {
            if (way.isEqual(currentWay, pointIndex) && way.getPointCell(pointIndex) === cell) {
                return way;
            }
        }
    }

    create (items) {
        this.ways = [];
        for (let i = 0; i < items.length; ++i) {
            this.ways.push(this.createWay(i, items[i]));
        }
    }

    createWay (index, items) {
        const way = new Club.DraughtsWay(index, this.board);
        way.create(items);
        return way;
    }

    [Symbol.iterator] () {
        return this.ways[Symbol.iterator]();
    }
};