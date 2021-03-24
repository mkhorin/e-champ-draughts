/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsOpponent = class DraughtsOpponent extends Club.DraughtsPlayer {

    isBot () {
        return this.data.type === 'bot';
    }

    getContainer () {
        return this.play.find('.opponent-player');
    }

    clear () {
        super.clear();
        this.solver?.clear();
    }

    update () {
        if (this.isBot()) {
            this.updateBot();
        }
        this.updateMessage();
    }

    updateBot () {
        if (this.play.isFinished()) {
            this.ready = true;
            return this.deactivate();
        }
        if (this.play.mover !== this) {
            return this.deactivate();
        }
        setTimeout(() => {
            this.createSolver().resolveMove(this.onMove.bind(this));
        }, 25);
    }

    onMove (way) {
        this.play.send(Club.Draughts.ACTION_MOVE, {way});
        this.deactivate();
    }

    processDrawOffer (done) {
        this.createSolver().resolveDraw(done);
    }

    createSolver () {
        const Class = this.getSolverClass();
        this.solver?.clear();
        this.solver = new Class(this);
        return this.solver;
    }

    getSolverClass () {
        return Club[this.data.params?.solver]
            || this.play.toggleAlert(true, 'Bot solver not found');

    }
};