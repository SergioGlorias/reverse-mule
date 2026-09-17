const Rounds = {
  playoff3: [
    'jJuEGS7V', 'GqbDNTqu', '9kIG6FCR', '30aL5ArX',
    'kFV2j1uT', '0k3n6CWx', 'HvA1X7pJ', 'qkVQTEkF',
    'eS5HGLGR', 'kucYKxgF', 'DaiOPYH8', 'SsobV5Rn',
    '4NnAnQ52', 'wBMzGZ5V', 'CdRlTNAb', 'OfwfHGjU',
    '0FNPYFHS', 'ZznfXU0u', '42AQfhRd', '4QtH2J0S',
    'XFXInXee', 'PmZ8TGSE', 'ciPYggKO', 'tmiNYfZo',
    'hjJ8FzDh', 'OcCms8FH', '9GGoU68v', 'W5Dn2sPL',
    'So79eZF3', '4K4x46Uw', 'LGdiyU62', 'q0TjkS7V',
    'ZobWmD8X', 'bPpTBIJ4', 'pow38Fwc', 'zaTySH4W',
    'GIL5Dc8o', 'HdHuaakY', 'JcHl5w4K', 'ogj4YyM8',
    'th1cKgHX', 'PCP1e8Qp', 'CxUvqwxa', 'MhAZAQvl',
    '4BTHOBBj', 'GqC3h9Jt', 'zb9w51iL', 'DODCyFZO'
  ],
  playoff2: [
    'kpZI9MVi', 'RHUs1IkL', 'EvTbMPXL',
    'wCASI6vp', '8qjOng8f', 'u3bBnaaS',
    'TOmHmuyv', 'jTX4w263', 'bBk8LMnZ',
    'GlCJ0Uvk', 'bUjLpMPC', '7pWDAUjj',
    '6csKgV1M', '8xeW94wS', '8cqF86lR',
    'Bai19oV3', 'ZftYhuNg', 'EiyFfckX',
    'hXA3lFSR', '0naeLnUI', 'q7gOEObq',
    'JUiFwhFj', 'hSbkaNQt', 'hqgnjN6v',
    'QQGPQVqE', 'eQS2KGkd', 'wDsx8J1Z',
    'tNYhzCw9', '9z34GekZ', 'PbhDOMET',
    'vab8sLBa', 'SmD5M2zH', 'CK9nH5fp',
    '4BXlmwn4', 'iyzfk8wX', 'MpIAiwXd',
    'q5tFKMYa', 'Ucsc2H4C', 'G1ACZd8s',
    'XJxL0bDg', 'cWJtmnxW', 'yZRG64KQ',
    '2pFs1W4B', 'bt76bXDU'
  ],
  playoff1: [
    'ZyTmxngv', 'VezHR9zN', 'wzUBgVOW',
    'rTWiyCwd', 'ULXb8XDu', 'La0hGDsh',
    'wZB3RIeW', 'QjG6mvoV', 'yhHgZJgP',
    '1TcHLC1E', 'rOatGOx6', 'V6KQmPby',
    '1Vz00ASW', 'bsh0LNLC', 'avEC3stg',
    '1nSL9jQl', '6FuTsu5v', 'xxxFdBYt',
    '6STcZI6b', 'evgY8z0b', 'MsKP9KbN',
    'VtxrkL71', 'qcmZrK3v', 'ccqJALHi',
    'MFUVm1JU', 'JjVIHaET'
  ],
  swiss: [
    'Nhw57KE3', 'e1yAqs6G',
    'fKo8MW7Q', '096Jx79c',
    'nrwmewUF', '7oTjtlPE',
    'D0xDDUDe', 'Jhc00xV5',
    'ZcYk0sTJ', 'dRWFdbTL',
    'qwlMA155', 'cGOgghZE',
    'BQ2RHtZz'
  ],
  // tiebreak: ["xXmZwEl5"],
};

export const roundChesck = (roundId, eventName) => {
  const tcecSeason = "TCEC Season 30 - ".toLowerCase();
  if (!eventName.includes(tcecSeason)) return;
  const event = eventName.replace(tcecSeason, "").trim();
  let roundLeague;
  if (event.includes("Category".toLowerCase()) && event.includes("Playoff".toLowerCase()) && event.includes("3") && event.includes("4"))
    roundLeague = Rounds.playoff3[roundId];
  else if (event === "Category 2 Playoff".toLowerCase())
    roundLeague = Rounds.playoff2[roundId];
  else if (event === "Category 1 Playoff".toLowerCase())
    roundLeague = Rounds.playoff1[roundId];
  else if (event === "Swiss 10".toLowerCase())
    roundLeague = Rounds.swiss[roundId];
  /*else if (
    event.includes("Tiebreak".toLowerCase()) &&
    event.includes(tcecSeason.toLowerCase())
  )
    roundLeague = Rounds.tiebreak[0];
  */
  return roundLeague;
};
