const Rounds = {
    pool: [
        'NKIbE6HD', '10mxnjux', 'en29eyWb', 'tvMy4pr3',
        'ADqJ9yzp', 'yTSjvKzA', 'jQG5HhaN', 'g3W27hSg',
        '0m4obK3F', 'sUHrf0QL', 'd30wIwuO', 'wpNE8JW1',
        '1YMDEYLd', '6qVLnrSl', 'JfWFUEdg', '6lOwpPQ2',
        'CoPkf2YT', 'oRvPGXGX', 'l9bfoe1P', 'L4S9vCgF',
        'DBWGkDQz', 'GQ5E1CBZ', 'xniwQq4e', 'Y7Age3dv',
        'P0l2o5U5', 'bcB50T9l', 'GsBaT3ea', 'CrL434pK',
        '5Fl8W77v', 'NV86VF1N', 'aFOIgiiM', 'SXkwoi4f',
        'CxWNMtCV', 'BciWvcB4', 'Xxu47jM8', 'm6MKXrES',
        'IXfEYNPz', 'SE4k52eI', 'iRRSAZPM', 'HKOJaFSG',
        'wlgOfs78', 'dpxxNfiN', 'TklQGloH', 'p34WWewV',
        '2Q4cPyvA', 'SQPfypIH', 'KM2HQqZy', 'zYKDMzR7',
        'r6gtVYQ5', 'q1EqoKWP', 'YuBklEft', 'm8Uff01L',
        'gOyD1Scp', 'qK2DOfWi', 'IZwAqjJL', 'Ml2zFt24'
    ],
    final: [
        'ZlCk3JtA'
    ],
    elf: [
        'MgyQOSw3'
    ]

};

export const roundChesck = (roundId, eventName) => {
    let roundLeague
    if (eventName === "TCEC Season 28 - 4K V".toLowerCase()) roundLeague = Rounds.pool[roundId];
    else if (eventName.includes("MiniFinal".toLowerCase())) roundLeague = Rounds.final[0];
    else if (eventName.includes("ELF".toLowerCase())) roundLeague = Rounds.elf[0];

    return roundLeague
}
