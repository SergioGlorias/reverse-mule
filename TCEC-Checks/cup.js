const seed = [
    "TBA", // 0
    "Stockfish", // 1
    "LCZero", // 2
    "Torch", // 3
    "Obsidian", // 4
    "Integral", // 5
    "Reckless", // 6
    "PlentyChess", // 7
    "Pawnocchio", // 8

    // RANDOM SEED (ordenado pelo randomizador)
    "Heimdall",    // 9  (22)
    "rofChade",    // 10 (25)
    "Tarnished",   // 11 (32)
    "Horsie",      // 12 (17)
    "Halogen",     // 13 (16)
    "Clover",      // 14 (9)
    "KomodoDragon",// 15 (12)
    "Velvet",      // 16 (28)
    "Igel",        // 17 (30)
    "Viridithas",  // 18 (13)
    "Caissa",      // 19 (15)
    "Renegade",    // 20 (31)
    "Berserk",     // 21 (10)
    "Stoofvlees",  // 22 (19)
    "Stormphrax",  // 23 (23)
    "Quanticade",  // 24 (18)
    "Ceres",       // 25 (14)
    "Seer",        // 26 (24)
    "Ginkgo",      // 27 (21)
    "BlackMarlin", // 28 (29)
    "Booot",       // 29 (26)
    "Ethereal",    // 30 (27)
    "Uralochka",   // 31 (20)
    "RubiChess",   // 32 (11)
];

const paring = [
    // Round 32
    [[seed[1], seed[9]], "le93lrnn"], // Match 1: Stockfish vs Heimdall
    [[seed[10], seed[11]], "JzTgASXP"], // Match 2: rofChade vs Tarnished
    [[seed[5], seed[12]], "Z88Qk5Hl"], // Match 3: Integral vs Horsie
    [[seed[13], seed[14]], "kQgYjGSL"], // Match 4: Halogen vs Clover
    [[seed[3], seed[15]], "yWsAUgSM"], // Match 5: Torch vs KomodoDragon
    [[seed[16], seed[17]], "qCcoyESX"], // Match 6: Velvet vs Igel
    [[seed[7], seed[18]], "H52sXlSI"], // Match 7: PlentyChess vs Viridithas
    [[seed[19], seed[20]], "YFPhRlWv"], // Match 8: Caissa vs Renegade
    [[seed[2], seed[21]], "nOOwC9xh"], // Match 9: LCZero vs Berserk
    [[seed[22], seed[23]], "Z3cFYBtP"], // Match 10: Stoofvlees vs Stormphrax
    [[seed[6], seed[24]], "zu7jRdd9"], // Match 11: Reckless vs Quanticade
    [[seed[25], seed[26]], "mP1TaQlG"], // Match 12: Ceres vs Seer
    [[seed[4], seed[27]], "42CWEBIb"], // Match 13: Obsidian vs Ginkgo
    [[seed[28], seed[29]], "kOcpneX9"], // Match 14: BlackMarlin vs Booot
    [[seed[8], seed[30]], "trrkNihx"], // Match 15: Pawnocchio vs Ethereal
    [[seed[31], seed[32]], "7Ir9itA9"], // Match 16: Uralochka vs RubiChess

    //Round 16
    [[seed[1], seed[10]], "fZwtGUdW"], // Match 1: Stockfish vs rofChade
    [[seed[5], seed[14]], "Xg3VATGD"], // Match 2: Integral vs Clover
    [[seed[3], seed[16]], "M49gn37U"], // Match 3: Torch vs Velvet
    [[seed[7], seed[19]], "aWDWPGce"], // Match 4: PlentyChess vs Caissa
    [[seed[2], seed[23]], "g36yDMJ8"], // Match 5: LCZero vs Stormphrax
    [[seed[6], seed[25]], "Ghpc5Ubu"], // Match 6: Reckless vs Ceres
    [[seed[4], seed[29]], "KeFzp4E1"], // Match 7: Obsidian vs Booot
    [[seed[30], seed[32]], "xPmSF70Z"], // Match 8: Ethereal vs RubiChess

    // Quarterfinals
    [[seed[1], seed[5]], "W2NOTjMF"], // Match 1: Stockfish vs Integral
    [[seed[3], seed[7]], "ojDtAwFG"], // Match 2: Torch vs PlentyChess
    [[seed[2], seed[6]], "LvgMG9Mb"], // Match 3: LCZero vs Reckless
    [[seed[4], seed[32]], "zVBR9MgL"], // Match 4: Obsidian vs RubiChess

    // Semifinals
    [[seed[1], seed[3]], "bOY7LLGU"], // Match 1: Stockfish vs Torch
    [[seed[2], seed[4]], "2akseQTP"], // Match 2: LCZero vs Obsidian

    // Bronze & Final
    [[seed[3], seed[2]], "9pagLfp5"], // Bronze: Torch vs LCZero
    [[seed[3], seed[4]], "9pagLfp5"], // Bronze - alternative: Torch vs Obsidian
    [[seed[1], seed[2]], "GLtCSuPC"], // Final: Stockfish vs LCZero
    [[seed[1], seed[4]], "GLtCSuPC"], // Final - alternative: Stockfish vs Obsidian
];

export const roundChesck = (white, black) =>
    paring.find((p) =>
        p[0].every((e) =>
            [white, black].some((name) =>
                name.toLowerCase().includes(e.toLowerCase())
            )
        )
    );