/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsBoard = class DraughtsBoard {

    static createCellArrays (size) {
        const cells = [];
        for (let i = 0; i < size; ++i) {
            cells.push([]);
        }
        return cells;
    }

    constructor (play) {
        this.play = play;
        this.$container = play.find('.board');
    }

    getCell (id) {
        return this.cellMap[id];
    }

    getCellByPos (x, y) {
        return this.cells[x]?.[y];
    }

    clear () {
        this.cells = [];
        this.cellMap = {};
    }

    createCells () {
        this.clear();
        this.size = this.play.options.boardSize;
        this.cells = this.constructor.createCellArrays(this.size);
        this.$container.find('.board-row').each(this.createCellRow.bind(this));
    }

    createCellRow (y, row) {
        $(row).find('.board-cell').each(this.createCell.bind(this, y));
    }

    createCell (y, x, element) {
        const pos = this.resolveCellPos(x, y);
        const cell = new Club.DraughtsCell(element, x, y, pos);
        this.cellMap[cell.id] = cell;
        this.cells[pos.x][pos.y] = cell;
    }

    resolveCellPos (x, y) {
        return {
            x: this.play.opposite ? this.size - x - 1 : x,
            y: this.play.opposite ? y : this.size - y - 1
        };
    }

    resize () {
        this.play.$container.css('--board-size', `${this.$container.width()}px`);
    }
};