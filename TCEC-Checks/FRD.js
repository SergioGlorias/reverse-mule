const Rounds = {
  playoffs: [
  'dauqNMCH', 'K4COqdkZ',
  't66KFvBA', 'llvfkjTH',
  '3kosgJwk', 'XS8hv5Ar',
  'rT5k3MB7', 'aF37wVaf',
  'KLUvBa2D', 'RALcJuC8',
  'FobYmWPZ', 'nb1iZlGx',
  '69RT7RMp', 'mziPzQXe'
  ],
  leagueA: [
  'ONNaoZyy', 'FXbCWKHX',
  'yXjP77wS', 'hCYV5TBe',
  '17G72tSQ', 'qNFI3Fcp',
  'nsCuZKE4', 'UpqrdHnN',
  'mKQhW70s', 'kaXnWHIi',
  'hzmHWUEP', 'eBEf1n3W',
  '6GZPGxdd', 'wrYHE1DJ'
],
  leagueB: [
  '6sG4Hy4T', 'isOajLDa',
  'aAXuu0vJ', 'Ob56cDem',
  'RapEt2wD', 'ieCWcreK',
  'ZVRFSija', 'bmamvCLf',
  'MFBlLfGk', '6IQ8p9iy',
  '511IqsIl', '7Lii3WMF',
  'X4rIAPV3', 'ctCgm5Rx'
],
  leagueC: [
  '9vtVDJB1', 'f2RJzFYR',
  'yz3J7rWA', 'z7pUrQ4e',
  'hhUDh9Ao', 'wgUOHPBw',
  '3cVelR6s', 'TBgrVqNi',
  'KXtwcv0A', 'ZjOMNtV3',
  '96RDaOXp', 'IX6wAPcc',
  'eZXfFmPt', 'XYboiQGP'
],
  leagueD: [
  'keSGEhn5', 'LDRRcjSE',
  'UXqCDtjn', 'zt1KcNg8',
  'eq58G6W4', 'ozgsr8if',
  'lErH63hj', 'HwJGgfbK',
  '6FkiFQXO', 'a51bVccv',
  'J7yqCeyz', 'lpmsEwYj',
  'spSdViR6', 'thOLkpBA'
],
  semileague1: [
  'lyGlVaCb', '2oBJgR7R',
  'wPWwMwNq', 'KfN56EIt',
  '8tVhkC6C', '3CCLMEq2',
  'aoUSHQVj', '0741fOHE',
  'bSfWS7oN', 'SBO5s5In',
  'zqLDwcR1', 'Fs4ykuam',
  'Ttwzxwe8', 'vmgwbTa8',
  'EksFKKBa', 'rhoeKpJX',
  'tTCJvAfG', 'HKKrL9IM',
  'G3Vc8CIU', '1gQDnoWq'
],
  semileague2: [
  'fjb9R51x', 'P26wwtO9',
  'pe6ILmkh', 'c4QCeWF6',
  'JiXp9ZYz', 'B5SbEeFO',
  'hqGT5V67', 'qCFXc6Ys',
  'q4OjPf5e', '0CrVZvdf',
  'gSkfZxza', 'oR8Uj3Mb',
  'Sc8R0IfQ', 'bAoKvE5f',
  'hNuWnYQt', 'KUo23od1',
  '0uTLnNlX', 'M0SbpLFo',
  'SIXgphAk', 'F1H5leCd'
],
  finalLeague: [
  'Q0OizD0K', '8QI6bsCF', '4raeZ9IH',
  'YKKDpM1p', 'P1nqzS0i', '5IYkEaG2',
  'sfrU3W4b', 'lDONBsda', '8ckBdtgx',
  'ti7xyXcb', 'vNexgeLz', 'WudKhihH',
  'GVg1mRey', 'O464HybI', '13owpyJM',
  'VMKVXPt1', '21FuQjIo', 'SEQGTdgG',
  'r1NC2v4E', 'aKU51rTx', 'VIOH3j2Y',
  'CHe4N4Yw', 'aW6tfXtc', 'F7BINXfa',
  'FLPmoRIA', 'w18b3sxD', 'VGPg1JZO',
  'oja2HU2C', '9ZQvP9tH', 'kFGqQczT',
  'R6w5FH07', '9oyG5UfW', 'NGHBbYqj',
  'Q3EFmmS6', 'QLpJbLTh', 'j871RmEB',
  'YjZgNCuV', 'E1MZzk1i', 'gSXR9NPG',
  'JpMNqeSE'
],
  final: ["zHej0LKs"], // Match
};

export const roundChesck = (roundId, eventName) => {
  let roundLeague
  if (eventName.includes("playoffs")) roundLeague = Rounds.playoffs[roundId];
  else if (eventName.includes("league a")) roundLeague = Rounds.leagueA[roundId];
  else if (eventName.includes("league b")) roundLeague = Rounds.leagueB[roundId];
  else if (eventName.includes("league c")) roundLeague = Rounds.leagueC[roundId];
  else if (eventName.includes("league d")) roundLeague = Rounds.leagueD[roundId];
  else if (eventName.includes("semileague 1")) roundLeague = Rounds.semileague1[roundId];
  else if (eventName.includes("semileague 2")) roundLeague = Rounds.semileague2[roundId];
  else if (eventName.includes("final league")) roundLeague = Rounds.finalLeague[roundId];
  else if (eventName.includes("final")) {
    if (roundLeague < 100) roundLeague = Rounds.final[0];
    //else roundLeague = Rounds.final[1];
  } else roundLeague = undefined;

  return roundLeague
}
