/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

const parent = require('./default-bot-standard-1');

module.exports = {

    label: 'Standard level 2',
    params: {
        ...parent.params,

        depth: [2, 3],
    },
    translations: {
        'ru': {
            label: 'Стандартный уровень 2'
        }
    }
};