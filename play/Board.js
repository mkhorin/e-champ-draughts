/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

module.exports = class Board {

    static LETTERS = 'abcdefgh';

    static isDarkCellOffset (x, y) {
        return x >= 0 && y >= 0 && x % 2 === y % 2;
    }

    getCell (id) {
        return this.cellMap[id];
    }

    getCellByPos (x, y) {
        return this.cells[x]?.[y];
    }

    create (size) {
        this.cells = [];
        this.cellMap = {};
        this.size = size;
        for (let x = 0; x < size; ++x) {
            let row = [];
            for (let y = 0; y < size; ++y) {
                let id = `${this.constructor.LETTERS.charAt(x)}${y + 1}`;
                let cell = {x, y, id};
                this.cellMap[id] = cell;
                row.push(cell);
            }
            this.cells.push(row);
        }
    }
};