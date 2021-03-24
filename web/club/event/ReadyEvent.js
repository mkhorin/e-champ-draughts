/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsReadyEvent = class DraughtsReadyEvent extends Club.DraughtsEvent {

    process () {
        this.player.deactivate();
        this.player.setReady(true);
        this.finish();
    }
};