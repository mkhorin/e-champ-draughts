/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

module.exports = {

    build: [{
        Class: 'Packer',
        sources: [
            'club/Draughts.js',
            'club/event/Event.js',
            'club/player/Player.js',
            'club'
        ],
        target: 'vendor/draughts.min.js',
        copyright: `/* @copyright Copyright (c) 2021 Maxim Khorin <maksimovichu@gmail.com> */\n`
    }]
};