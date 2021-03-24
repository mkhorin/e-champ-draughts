/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

module.exports = class Piece {

    constructor (color, cell, crowned, pieces) {
        this.pieces = pieces;
        this.color = color;
        this.crowned = crowned;
        this.cell = cell;
        this.cell.piece = this;
    }

    setPoint (point) {
        if (this.cell) {
            this.cell.piece = null;
        }
        this.cell = point.cell;
        this.crowned = point.crowned;
        point.cell.piece = this;
    }

    remove () {
        if (this.cell) {
            this.cell.piece = null;
        }
        this.pieces.removeItem(this);
    }
};