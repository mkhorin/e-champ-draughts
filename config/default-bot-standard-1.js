/**
 * @copyright Copyright (c)2021 Maxim Khorin <maksimovichu@gmail.com>
 */
'use strict';

module.exports = {
    
    label: 'Standard level 1',
    params: {
        solver: 'DraughtsStandardSolver',
        depth: [1, 2],
        values: {
            coronation: 4,
            firstKing: 8,
            king: 6,
            man: 2
        },
        losingValues: {
            coronation: 0,
            firstKing: 0,
            king: -6,
            man: -2
        }
    },
    translations: {
        'ru': {
            label: 'Стандартный уровень 1'
        }
    }
};