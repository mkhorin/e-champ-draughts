/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

module.exports = class Pieces {

    static DARK_KEY = 'D';
    static LIGHT_KEY = 'L';

    constructor (play) {
        this.play = play;
        this.board = play.board;
    }

    getByColor (color) {
        return this.itemMap[color];
    }

    create (data) {
        this.items = data.split(',').map(this.createPiece, this);
        this.itemMap = this.indexByColor();
    }

    createPiece (data) {
        data = data.trim();
        const color = this.getColorByData(data);
        const cell = this.board.getCell(data.substring(1, 3));
        const crowned = data.length > 3;
        return new Piece(color, cell, crowned, this);
    }

    getColorByData (data, play) {
        const key = data.substring(0, 1);
        if (key === this.constructor.DARK_KEY) {
            return this.play.constructor.DARK;
        }
        if (key === this.constructor.LIGHT_KEY) {
            return this.play.constructor.LIGHT;
        }
    }

    indexByColor () {
        const map = {
            [this.play.constructor.LIGHT]: [],
            [this.play.constructor.DARK]: []
        };
        for (const item of this.items) {
            map[item.color].push(item);
        }
        return map;
    }

    removeItem (item) {
        ArrayHelper.remove(item, this.items);
        ArrayHelper.remove(item, this.itemMap[item.color]);
    }
};

const ArrayHelper = require('areto/helper/ArrayHelper');
const Piece = require('./Piece');