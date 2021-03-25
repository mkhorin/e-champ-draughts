/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const defaults = require('e-champ/config/default-game');

module.exports = {

    ...defaults,

    Class: require('../Game'),
    label: 'Draughts',
    play: {
        Class: require('../play/Draughts')
    },
    actions: {
        'acceptDraw': {
            Class: require('../action/AcceptDrawAction')
        },
        'continue': {
            Class: require('../action/ContinueAction')
        },
        'move': {
            Class: require('../action/MoveAction')
        },
        'offerDraw': {
            Class: require('../action/OfferDrawAction')
        },
        'rejectDraw': {
            Class: require('../action/RejectDrawAction')
        },
        'resign': {
            Class: require('../action/ResignAction')
        }
    },
    bots: {
        'default': require('./default-bot')
    },
    defaultBot: 'default',
    maxPlayers: 2,
    options: {
        actionTimeout: 90, // seconds
        boardSize: 8
    },
    optionModel: {
        Class: require('../model/Options')
    },
    assets: require('./default-assets'),
    templates: {
        messages: 'template/messages',
        play: 'template/play',
        playback: 'template/play'
    },
    webPage: 'https://github.com/mkhorin/e-champ-draughts'
};