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
    //
    // engines que vão entrar:
    /* Viridithas
    Raphael
    Ceres
    Igel
    Berserk
    Quanticade
    Caissa
    Cinder
    Obsidian
    Stormphrax
    Ginkgo
    PZChessBot
    RubiChess
    Clover
    rofChade
    Tarnished
    Tcheran
    Uralochka
    Seer
    Prune
    Heimdall
    KomodoDragon
    Arasan
    Stoofvlees */
    // Ainda não se sabe qual a ordem Final 

];

const paring = [
    // Round 32
    [[seed[1], seed[9]], "Kc9hjdrh"], // Match 1: 
    [[seed[10], seed[11]], "XfXHTlGw"], // Match 2:
    [[seed[5], seed[12]], "unBB0fI7"], // Match 3:
    [[seed[13], seed[14]], "5IyabTlU"], // Match 4:
    [[seed[3], seed[15]], "H6DLf23N"], // Match 5:
    [[seed[16], seed[17]], "gADHABoc"], // Match 6: 
    [[seed[7], seed[18]], "69tTImGB"], // Match 7: 
    [[seed[19], seed[20]], "nihndDlz"], // Match 8:
    [[seed[2], seed[21]], "8JN5MKzT"], // Match 9: 
    [[seed[22], seed[23]], "i3eb5Ofg"], // Match 10: 
    [[seed[6], seed[24]], "OxO0RZaz"], // Match 11: 
    [[seed[25], seed[26]], "jKlIAcfW"], // Match 12: 
    [[seed[4], seed[27]], "AA2HeEfj"], // Match 13: 
    [[seed[28], seed[29]], "mv7O4xeN"], // Match 14: 
    [[seed[8], seed[30]], "adfmlQiE"], // Match 15: 
    [[seed[31], seed[32]], "t42BdMkM"], // Match 16: 

    //Round 16
    [[seed[0], seed[0]], "mLNV5DfZ"], // Match 1: TBA
    [[seed[0], seed[0]], "0iCOhFHM"], // Match 2: TBA
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
                name.toLowerCase().includes(e.toLowerCase())
            )
        )
    );