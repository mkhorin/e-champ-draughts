/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsEndEvent = class DraughtsEndEvent extends Club.DraughtsEvent {

    process () {
        const data = this.data;
        this.getPlayer(data.winner)?.setWinner();
        this.getPlayer(data.loser)?.setLoser();
        this.getPlayer(data.draw1)?.setDraw();
        this.getPlayer(data.draw2)?.setDraw();
        this.play.toggleRoundEnd(true, data.resigned);
        this.play.master.activate();
        this.finish();
    }
};
