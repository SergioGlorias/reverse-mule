const seed = [
  "TBA", // 0
  "Stockfish", // 1
  "PlentyChess", // 2
  "Reckless", // 3
  "Pawnocchio", // 4
  "Integral", // 5
  "Torch", // 6
  "Halogen", // 7
  "LCZero", // 8

  // RANDOM SEED (ordenado pelo randomizador)
  "Stormphrax", // 18 (9)
  "Stoofvlees", // 32 (10)
  "Berserk", // 13 (11)
  "Seer", // 27 (12)
  "Igel", // 12 (13)
  "Arasan", // 31 (14)
  "Viridithas", // 9 (15)
  "rofChade", // 23 (16)
  "Raphael", // 10 (17)
  "Tarnished", // 24 (18)
  "PZChessBot", // 20 (19)
  "KomodoDragon", // 30 (20)
  "Ceres", // 11  (21)
  "Uralochka", // 26 (22)
  "Obsidian", // 17 (23)
  "Tcheran", // 25 (24)
  "Cinder", // 16 (25)
  "Prune", // 28 (26)
  "Ginkgo", // 19 (27)
  "RubiChess", // 21 (28)
  "Quanticade", // 14 (29)
  "Clover", // 22 (30)
  "Caissa", // 15  (31)
  "Heimdall", // 29 (32)
];

const paring = [
  // Round 32
  [[seed[1], seed[9]], "Kc9hjdrh"], // Match 1: Stockfish vs Stormphrax
  [[seed[10], seed[11]], "XfXHTlGw"], // Match 2: Stoofvlees vs Berserk
  [[seed[5], seed[12]], "unBB0fI7"], // Match 3: Integral vs Seer
  [[seed[13], seed[14]], "5IyabTlU"], // Match 4: Arasan vs Igel
  [[seed[3], seed[15]], "H6DLf23N"], // Match 5: Reckless vs Viridithas
  [[seed[16], seed[17]], "gADHABoc"], // Match 6: rofChade vs Raphael
  [[seed[7], seed[18]], "69tTImGB"], // Match 7: Halogen vs Tarnished
  [[seed[19], seed[20]], "nihndDlz"], // Match 8: PZChessBot vs KomodoDragon
  [[seed[2], seed[21]], "8JN5MKzT"], // Match 9: PlentyChess vs Ceres
  [[seed[22], seed[23]], "i3eb5Ofg"], // Match 10: Uralochka vs Obsidian
  [[seed[6], seed[24]], "OxO0RZaz"], // Match 11: Torch vs Tcheran
  [[seed[25], seed[26]], "jKlIAcfW"], // Match 12: Cinder vs Prune
  [[seed[4], seed[27]], "AA2HeEfj"], // Match 13: Pawnocchio vs Ginkgo
  [[seed[28], seed[29]], "mv7O4xeN"], // Match 14: RubiChess vs Quanticade
  [[seed[8], seed[30]], "adfmlQiE"], // Match 15: LCZero vs Clover
  [[seed[31], seed[32]], "t42BdMkM"], // Match 16: Caissa vs Heimdall

  //Round 16
  [[seed[1], seed[11]], "mLNV5DfZ"], // Match 1: Stockfish vs Berserk
  [[seed[5], seed[13]], "0iCOhFHM"], // Match 2: Integral vs Igel
  [[seed[0], seed[0]], "s07Ntgws"], // Match 3: TBA
  [[seed[0], seed[0]], "ghCgtzRT"], // Match 4: TBA
  [[seed[0], seed[0]], "IrXO7tUd"], // Match 5: TBA
  [[seed[0], seed[0]], "Mql1boTw"], // Match 6: TBA
  [[seed[0], seed[0]], "77GFEPVG"], // Match 7: TBA
  [[seed[0], seed[0]], "SA0QKouI"], // Match 8: TBA

  // Quarterfinals
  [[seed[0], seed[0]], "Mu60kny7"], // Match 1: TBA
  [[seed[0], seed[0]], "tO4JDKEb"], // Match 2: TBA
  [[seed[0], seed[0]], "xFb1L392"], // Match 3: TBA
  [[seed[0], seed[0]], "Jpk1ciGk"], // Match 4: TBA

  // Semifinals
  [[seed[0], seed[0]], "wZw3g9gr"], // Match 1: TBA
  [[seed[0], seed[0]], "R2pSz1OU"], // Match 2: TBA

  // Bronze & Final
  [[seed[0], seed[0]], "rNG6zA9G"], // Bronze: TBA
  [[seed[0], seed[0]], "rNG6zA9G"], // Bronze - alternative: TBA
  [[seed[0], seed[0]], "foQc9DHb"], // Final: TBA
  [[seed[0], seed[0]], "foQc9DHb"], // Final - alternative: TBA
];

export const roundChesck = (white, black) =>
  paring.find((p) =>
    p[0].every((e) =>
      [white, black].some((name) =>
        name.toLowerCase().includes(e.toLowerCase()),
      ),
    ),
  );
