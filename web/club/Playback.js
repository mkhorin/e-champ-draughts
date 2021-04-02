/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
Club.DraughtsPlayback = class DraughtsPlayback extends Club.Draughts {

    constructor () {
        super(...arguments);
        this.on('click', '.playback-action-pause', this.onPause.bind(this));
        this.on('click', '.playback-action-play', this.onPlay.bind(this));
        this.on('click', '.playback-action-start', this.onStart.bind(this));
        this.on('click', '.playback-action-end', this.onEnd.bind(this));
        this.toggleClass('playback', true);
    }

    onHandledHiddenEvents () {}

    onHandledEvents () {
        this.togglePause(true);
    }

    start (data) {
        super.start(...arguments);
        this.page.toggleLoading(false);
        this.toggleClass('hidden', false);
        this.events.add(data.events);
        this.processEvents();
    }

    processEvents () {
        this.events.stopIndex = 1;
        this.events.process();
    }

    startPlayback () {
        const ended = this.events.process();
        this.events.process();
    }

    onPlay () {
        this.togglePause(false);
        this.events.isEnded()
            ? this.onStart()
            : this.events.continue();
    }

    onPause () {
        this.togglePause(true);
        this.events.stop();
    }

    onStart () {
        this.togglePause(false);
        this.events.reset();
        this.processEvents();
    }

    onEnd () {
        this.events.hiddenIndex = this.events.count() - 1;
        this.onPlay();
    }

    togglePause () {
        this.toggleClass('paused', ...arguments);
    }

    attachSocket () {}

    startCountdown () {}

    resolveLastHiddenEventIndex () {
        return -1;
    }
};