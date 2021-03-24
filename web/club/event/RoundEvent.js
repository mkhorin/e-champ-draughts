/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsRoundEvent = class DraughtsRoundEvent extends Club.DraughtsEvent {

    process () {
        this.play.events.clearBeforeCursor();
        this.play.startRound(this.data);
        this.finish();
    }
};