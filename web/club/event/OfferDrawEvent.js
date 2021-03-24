/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsOfferDrawEvent = class DraughtsOfferDrawEvent extends Club.DraughtsEvent {

    process () {
        if (!this.play.events.isEnded()) {
            return this.finish();
        }
        if (this.player !== this.play.master) {
            this.confirmMaster();
        }
        if (this.play.opponent.isBot()) {
            this.play.opponent.processDrawOffer(this.execute.bind(this));
        }
        this.finish();
    }

    confirmMaster () {
        Jam.dialog.confirm(this.getConfirmationMessage(), {
            css: 'success',
            returnCancel: true,
            strictCancel: true,
            submitText: this.play.translate('Accept'),
            cancelText: this.play.translate('Reject'),
            cancelCss: 'btn-danger',
            title: this.play.translate('Request')
        }).then(this.execute.bind(this));
    }

    getConfirmationMessage () {
        return `${this.player.name} ${this.play.translate('offers a draw')}`;
    }

    execute (accepted) {
        this.play.send(accepted
            ? Club.Draughts.ACTION_ACCEPT_DRAW
            : Club.Draughts.ACTION_REJECT_DRAW);
    }
};