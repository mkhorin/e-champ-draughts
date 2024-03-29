/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

module.exports = class Ways {

    static DARK_FORWARD_STEPS = [[1, -1], [-1, -1]];
    static LIGHT_FORWARD_STEPS = [[1, 1], [-1, 1]];
    static STEPS = [[1, -1], [-1, -1], [1, 1], [-1, 1]];

    constructor (play) {
        this.play = play;
        this.board = play.board;
        this.backCapture = play.options.backCapture;
        this.optionalCapture = play.options.optionalCapture;
    }

    isEmpty () {
        return !this.ways.length;
    }

    get (index) {
        return this.ways[index];
    }

    resolve (mover) {
        this.mover = mover;
        if (this.mover.isLight()) {
            this.forwardSteps = this.constructor.LIGHT_FORWARD_STEPS;
            this.moverTop = this.board.size - 1;
        } else {
            this.forwardSteps = this.constructor.DARK_FORWARD_STEPS;
            this.moverTop = 0;
        }
        this.moverPieces = this.play.pieces.getByColor(mover.color);
        this.ways = [];
        this.resolveCaptures();
        if (this.optionalCapture || !this.ways.length) {
            this.resolveMoves();
        }
    }

    resolveMoves () {
        for (const piece of this.moverPieces) {
            this.way = new Way(piece);
            piece.crowned
                ? this.resolveKingMoves()
                : this.resolveManMoves();
        }
    }

    resolveManMoves () {
        for (let [dx, dy] of this.forwardSteps) {
            let x = this.way.piece.cell.x + dx;
            let y = this.way.piece.cell.y + dy;
            let cell = this.board.getCellByPos(x, y);
            if (cell && !cell.piece) {
                this.appendWay(cell, this.moverTop === y);
            }
        }
    }

    resolveKingMoves () {
        for (const [dx, dy] of this.constructor.STEPS) {
            let {x, y} = this.way.piece.cell;
            let cell = null;
            while (true) {
                x += dx;
                y += dy;
                cell = this.board.getCellByPos(x, y);
                if (!cell || cell.piece) {
                    break;
                }
                this.appendWay(cell, true);
            }
        }
    }

    appendWay (cell, crowned) {
        const start = this.way.points[0];
        const end = {cell, crowned};
        const way = new Way(this.way.piece, [start, end]);
        this.ways.push(way);
    }

    resolveCaptures () {
        for (const piece of this.moverPieces) {
            this.way = new Way(piece);
            piece.crowned
                ? this.resolveKingCaptures()
                : this.resolveManCaptures();
        }
    }

    resolveKingCaptures () {
        let captured = false;
        let point = this.way.getLast();
        for (const [dx, dy] of this.constructor.STEPS) {
            const piece = this.getClosestPiece(point.cell, dx, dy);
            if (!this.canCapture(piece)) {
                continue;
            }
            piece.captured = true;
            let cell = null;
            let {x, y} = piece.cell;
            let nextCapture = false;
            let points = [];
            while (true) {
                cell = this.board.getCellByPos(x += dx, y += dy);
                if (!cell || cell.piece) {
                    break;
                }
                const point = {
                    capture: piece,
                    crowned: true,
                    cell
                };
                points.push(point);
                this.way.points.push(point);
                if (this.resolveKingCaptures()) {
                    nextCapture = true;
                }
                this.way.points.pop();
                captured = true;
            }
            if (captured && !nextCapture) {
                for (const point of points) {
                    const points = [...this.way.points];
                    points.push(point);
                    const way = new Way(this.way.piece, points);
                    this.ways.push(way);
                }
            }
            piece.captured = false;
        }
        return captured;
    }

    canCapture (piece) {
        return piece
            && piece.color !== this.mover.color
            && !piece.captured;
    }

    getClosestPiece (cell, dx, dy) {
        let {x, y} = cell;
        do {
            x += dx;
            y += dy;
            cell = this.board.getCellByPos(x, y);
        } while (cell && !cell.piece);
        return cell?.piece;
    }

    resolveManCaptures () {
        let captured = false;
        let point = this.way.getLast();
        let steps = this.backCapture ? this.constructor.STEPS : this.forwardSteps;
        for (let [dx, dy] of steps) {
            let x = point.cell.x + dx;
            let y = point.cell.y + dy;
            let cell = this.board.getCellByPos(x, y);
            let piece = cell?.piece;
            if (!this.canCapture(piece)) {
                continue;
            }
            cell = this.board.getCellByPos(x += dx, y += dy);
            if (!cell || cell.piece) {
                continue;
            }
            let crowned = this.moverTop === y;
            piece.captured = true;
            this.way.points.push({cell, crowned, capture: piece});
            const nextCapture = crowned
                ? this.resolveKingCaptures()
                : this.resolveManCaptures();
            if (!nextCapture) {
                const way = new Way(this.way.piece, [...this.way.points]);
                this.ways.push(way);
            }
            this.way.points.pop();
            piece.captured = false;
            captured = true;
        }
        return captured;
    }

    serialize () {
        return this.ways.map(way => way.serialize());
    }
};

const Way = require('./Way');