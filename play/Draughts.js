/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const Base = require('e-champ/arena/Play');

module.exports = class Draughts extends Base {

    static DARK = 'dark';
    static LIGHT = 'light';

    start () {
        super.start();
        this.players = this.room.players;
        this.board = new Board(this);
        this.pieces = new Pieces(this);
        this.ways = new Ways(this);
        this.hands = this.room.players.map(this.createHand, this);
        this.round = 0;
        this.startRound();
    }

    createHand (player) {
        return new Hand(player, this);
    }

    startRound () {
        this.finished = false;
        this.events.clear();
        this.board.create(this.options.boardSize);
        const pieces = this.options.initialPosition || this.getDefaultPosition();
        this.pieces.create(pieces);
        this.addEvent('round', {
            options: this.options,
            players: this.hands.map(hand => hand.getData()),
            round: this.round,
            pieces
        });
        this.mover = null;
        this.nextTurn();
    }

    getDefaultPosition () {
        return 'La1,Lc1,Le1,Lg1,Lb2,Ld2,Lf2,Lh2,La3,Lc3,Le3,Lg3,Db6,Dd6,Df6,Dh6,Da7,Dc7,De7,Dg7,Db8,Dd8,Df8,Dh8';
    }

    nextTurn () {
        this.mover = this.getNextHand(this.mover);
        this.ways.resolve(this.mover);
        if (this.ways.isEmpty()) {
            const loser = this.options.losing
                ? this.getNextHand(this.mover)
                : this.mover;
            return this.endRound(loser);
        }
        this.addEvent('turn', {
            mover: this.mover.pos,
            ways: this.ways.serialize()
        });
        this.update();
    }

    getNextHand (current) {
        return current
            ? this.hands[(current.pos + 1) % this.hands.length]
            : this.hands[this.options.darkFirst ? 1: 0];
    }

    endRound (loser, params) {
        const winner = loser ? this.getNextHand(loser) : null;
        const draw1 = loser ? null : this.hands[0];
        const draw2 = loser ? null : this.hands[1];
        draw1?.addDraw();
        draw2?.addDraw();
        winner?.addWin();
        loser?.addLosing();
        this.finished = true;
        this.roundLoser = loser;
        this.addEvent('end', {
            loser: loser?.pos,
            winner: winner?.pos,
            draw1: draw1?.pos,
            draw2: draw2?.pos,
            ...params
        });
        this.hands[0].turned = this.hands[0].isBot();
        this.hands[1].turned = this.hands[1].isBot();
    }

    arePlayersReady () {
        return this.hands[0].turned && this.hands[1].turned;
    }

    setPlayerReady (hand) {
        hand.turned = true;
        this.addEvent('ready', [hand.pos]);
    }
};

const Board = require('./Board');
const Hand = require('./Hand');
const Pieces = require('./Pieces');
const Ways = require('./Ways');