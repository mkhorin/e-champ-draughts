/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsPieces = class DraughtsPieces {

    static DARK_KEY = 'D';
    static LIGHT_KEY = 'L';

    constructor (play) {
        this.play = play;
        this.$container = play.find('.pieces');
    }

    getByElement (element) {
        for (const piece of this.pieces) {
            if (piece.element === element) {
                return piece;
            }
        }
    }

    clear () {
        this.pieces = [];
        this.$container.empty();
    }

    create (data) {
        this.pieces = data.split(',').map(this.createPiece, this);
    }

    createPiece (data) {
        data = data.trim(',');
        return new Club.DraughtsPiece({
            color: this.getColorByData(data),
            cell: this.play.board.getCell(data.substring(1, 3)),
            crowned: data.length > 3,
            element: this.createElement(),
            pieces: this
        });
    }

    createElement () {
        const element = document.createElement('div');
        element.classList.add('piece');
        this.$container.append(element);
        return element;
    }

    getColorByData (data) {
        const key = data.substring(0, 1);
        if (key === this.constructor.DARK_KEY) {
            return this.play.constructor.DARK;
        }
        if (key === this.constructor.LIGHT_KEY) {
            return this.play.constructor.LIGHT;
        }
    }

    removePiece (piece) {
        Jam.ArrayHelper.remove(piece, this.pieces);
    }

    resize () {
        this.pieces?.forEach(piece => piece.resize());
    }

    stringify () {
        return this.pieces.map(piece => {
            const color = piece.isLight()
                ? this.constructor.LIGHT_KEY
                : this.constructor.DARK_KEY;
            const crowned = piece.crowned ? '+' : '';
            return color + piece.cell.id + crowned;
        }).join(', ');
    }

    [Symbol.iterator] () {
        return this.pieces[Symbol.iterator]();
    }
};