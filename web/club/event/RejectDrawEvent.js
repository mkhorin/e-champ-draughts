/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsRejectDrawEvent = class DraughtsRejectDrawEvent extends Club.DraughtsEvent {

    process () {
        if (this.player !== this.play.master && this.play.events.isEnded()) {
            Jam.dialog.info(this.getRejectionMessage());
        }
        this.finish();
    }

    getRejectionMessage() {
        return `${this.player.name} ${this.play.translate('rejected your draw offer')}`;
    }
};
