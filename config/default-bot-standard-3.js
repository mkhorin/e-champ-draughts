/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const parent = require('./default-bot-standard-1');

module.exports = {

    label: 'Standard level 3',
    params: {
        ...parent.params,

        depth: [3, 4],
    },
    translations: {
        'ru': {
            label: 'Стандартный уровень 3'
        }
    }
};