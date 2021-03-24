/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('areto/base/Model');

module.exports = class Options extends Base {

    static getConstants () {
        return {
            ATTRS: [
                {
                    name: 'losing',
                    label: 'Losing draughts',
                    view: 'checkbox',
                    format: 'boolean'
                }, {
                    name: 'darkFirst',
                    label: 'Dark turn first',
                    view: 'checkbox',
                    format: 'boolean'
                }, {
                    name: 'initialPosition',
                    label: 'Initial position',
                    hint: 'Lc1, Le1+, Df8, Dd8+',
                    view: 'string'
                }
            ],
            RULES: [
                [[
                    'losing',
                    'darkFirst'
                ],  'checkbox'],
                [[
                    'initialPosition'
                ],  'validateInitialPosition']
            ]
        };
    }

    validateInitialPosition (attr) {
        this.cells = {};
        for (const data of this.get(attr).split(',') ) {
            if (!this.validatePiece(data)) {
                return this.addError(attr, 'Invalid position');
            }
        }
    }

    validatePiece (data) {
        data = data.trim();
        if (data.length > 4 || !this.validatePieceColor(data) || !this.validatePieceCell(data)) {
            return false;
        }
        const id = data.substring(1, 3);
        if (this.cells[id]) {
            return false;
        }
        this.cells[id] = data;
        return true;
    }

    validatePieceColor (data) {
        const key = data.substring(0, 1);
        return key === 'L' || key === 'D';
    }

    validatePieceCell (data) {
        const x = Board.LETTERS.indexOf(data.substring(1, 2));
        const y = Number(data.substring(2, 3) - 1);
        return Board.isDarkCellOffset(x, y) && x < 8 && y < 8;
    }
};
module.exports.init(module);

const Board = require('../play/Board');

