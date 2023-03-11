/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

module.exports = class Way {

    constructor (piece, points) {
        this.piece = piece;
        this.points = points || [{
            cell: piece.cell,
            crowned: piece.crowned
        }];
    }

    getLast () {
        return this.points[this.points.length - 1];
    }

    execute () {
        for (const point of this.points) {
            point.capture?.remove();
        }
        const last = this.getLast();
        this.piece.setPoint(last);
    }

    serialize () {
        return this.points.map(this.serializePoint, this);
    }

    serializePoint (point) {
        return {
            cell: point.cell.id,
            crowned: point.crowned,
            capture: point.capture?.cell.id
        };
    }
};