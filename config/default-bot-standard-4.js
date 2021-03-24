/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const parent = require('./default-bot-standard-1');

module.exports = {

    label: 'Standard level 4',
    params: {
        ...parent.params,

        depth: [4, 5],
    },
    translations: {
        'ru': {
            label: 'Стандартный уровень 4'
        }
    }
};