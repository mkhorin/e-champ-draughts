/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsMaster = class DraughtsMaster extends Club.DraughtsPlayer {

    static MESSAGE_ADMIT_DEFEAT = 'Are you sure you want to admit defeat?';

    constructor () {
        super(...arguments);
        this.play.on('click', '.piece', this.onPiece.bind(this));
        this.play.on('click', '.board-cell', this.onCell.bind(this));
        this.$continue = this.play.find('[data-action="continue"]');
        this.$offerDraw = this.play.find('[data-action="offerDraw"]');
        this.$resign = this.play.find('[data-action="resign"]');
        this.$continue.click(this.onContinue.bind(this));
        this.$offerDraw.click(this.onOfferDraw.bind(this));
        this.$resign.click(this.onResign.bind(this));
    }

    getContainer () {
        return this.play.find('.master-player');
    }

    activate () {
        super.activate();
        this.play.toggleMaster(true);
        this.way = null;
        this.$continue.attr('disabled', !this.play.isFinished() || this.ready);
        this.$offerDraw.attr('disabled', !this.play.events.isLastName(Club.DraughtsEvent.TURN));
        this.$resign.attr('disabled', this.play.isFinished());
    }

    deactivate () {
        super.deactivate();
        this.play.toggleMaster(false);
        this.resetSelection();
    }

    update () {
        this.canAct() ? this.activate() : this.deactivate();
        this.updateMessage();
    }

    canAct () {
        if (this.play.isFinished()) {
            return !this.ready;
        }
        if (this.play.events.isLastName(Club.DraughtsEvent.OFFER_DRAW)) {
            return false;
        }
        return this.play.mover === this;
    }

    onCell (event) {
        if (!this.way) {
            return false;
        }
        const cell = this.board.getCell(event.currentTarget.dataset.cell);
        const next = this.waypointIndex + 1;
        const way = this.play.ways.getByCell(cell, this.way, next);
        if (!way) {
            return false;
        }
        this.waypointIndex = next;
        this.way = way;
        this.play.toggleMaster(false);
        this.way.get(next)
            .transit(this.way.piece)
            .then(this.onTransit.bind(this));
    }

    onTransit () {
        if (!this.way.isLastIndex(this.waypointIndex)) {
            return this.play.toggleMaster(true);
        }
        const way = this.way.index;
        this.play.send(Club.Draughts.ACTION_MOVE, {way});
        this.way.piece.toggleSelected(false);
        this.lastWay = this.way;
        this.way = null;
        this.deactivate();
    }

    onPiece (event) {
        const piece = this.play.pieces.getByElement(event.currentTarget);
        if (this.way?.piece === piece) {
            return this.resetSelection();
        }
        const way = this.play.ways.getByPiece(piece);
        if (!way) {
            return false;
        }
        this.resetSelection();
        piece.toggleSelected(true);
        this.way = way;
        this.waypointIndex = 0;
    }

    resetSelection () {
        this.way?.piece.toggleSelected(false);
        this.way?.cancel();
        this.way = null;
    }

    onContinue () {
        this.deactivate();
        this.play.send(Club.Draughts.ACTION_CONTINUE);
    }

    onOfferDraw () {
        this.offerDraw();
    }

    offerDraw () {
        this.deactivate();
        this.play.send(Club.Draughts.ACTION_OFFER_DRAW);
    }

    onResign () {
        Jam.dialog.confirm(this.play.translate(this.constructor.MESSAGE_ADMIT_DEFEAT))
            .then(this.resign.bind(this));
    }

    resign () {
        this.deactivate();
        this.play.send(Club.Draughts.ACTION_RESIGN);
    }

    setEndStatus (status) {
        this.play.setDataAttr('end', status);
    }
};