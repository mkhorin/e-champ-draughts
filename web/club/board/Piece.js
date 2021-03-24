/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsPiece = class DraughtsPiece {

    static SPEED_FACTOR = .5;

    constructor (config) {
        this.pieces = config.pieces;
        this.element = config.element;
        this.setColor(config.color);
        this.setCrown(config.crowned);
        this.setCell(config.cell);
    }

    isCaptured () {
        return this.element.classList.contains('captured');
    }

    isDark () {
        return this.color === Club.Draughts.DARK;
    }

    isLight () {
        return this.color === Club.Draughts.LIGHT;
    }

    setColor (color) {
        this.color = color;
        this.element.setAttribute('data-color', color);
    }

    setCrown (state) {
        this.crowned = state;
        this.element.classList.toggle('crowned', state);
    }

    setCell (cell) {
        this.cell?.removePiece(this);
        cell?.setPiece(this);
        this.cell = cell;
    }

    setOffset (left, top) {
        Club.setElementOffset(left, top, this.element);
    }

    remove () {
        this.setCell(null);
        this.pieces.removePiece(this);
        this.element.remove();
    }

    toggleSelected (state) {
        this.toggleClass('selected', state);
    }

    toggleCaptured (state) {
        this.toggleClass('captured', state);
    }

    toggleClass () {
        this.element.classList.toggle(...arguments);
    }

    transit (cell) {
        return this.pieces.play.motion.move({
            element: this.element,
            target: cell.getOffset(),
            speed: this.getSpeed(cell)
        });
    }

    getSpeed (cell) {
        return cell.getSize() * this.constructor.SPEED_FACTOR;
    }

    resize () {
        this.setOffset(...this.cell.getOffset());
    }
};