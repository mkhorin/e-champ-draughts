/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsCell = class DraughtsCell {

    static LETTERS = 'abcdefghij';

    static createId (pos) {
        return `${this.LETTERS.charAt(pos.x)}${pos.y + 1}`;
    }

    constructor (element, x, y, pos) {
        this.x = x;
        this.y = y;
        this.id = this.constructor.createId(pos);
        this.pos = pos;
        this.element = element;
        this.element.dataset.cell = this.id;
    }

    setPiece (piece) {
        this.piece = piece;
        piece.setOffset(...this.getOffset());
    }

    removePiece () {
        this.piece = null;
    }

    getOffset () {
        return [this.element.offsetLeft, this.element.offsetTop];
    }

    getOffsetSigns (source) {
        return [
            Math.sign(this.x - source.x),
            Math.sign(this.y - source.y)
        ];
    }

    getSize () {
        return this.element.offsetWidth;
    }
};