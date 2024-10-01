import { parsePgn, makePgn } from 'chessops/pgn';
import process from 'node:process';

const litoken = process.env.LICHESS_TOKEN

const seed = [
    "TBA", // 0
    "Stockfish", // 1
    "LCZero", // 2
    "Ceres", // 3
    "Berserk", // 4
    "Revenge",// 5
    "Obsidian", // 6
    "Ethereal", // 7
    "KomodoDragon", // 8

    // RANDOM SEED

    "Texel", // 9
    "Stormphrax", // 10
    "Seer", // 11
    "Caissa", // 12
    "RubiChess", // 13
    "PlentyChess", // 14
    "DeepSjeng", // 15
    "Arasan", // 16
    "Uralochka", // 17
    "akimbo", // 18
    "Equisetum", // 19
    "Booot", // 20
    "StoofVlees", // 21
    "BlackMarlin", // 22
    "Velvet", // 23
    "Igel", // 24
    "Tucano", // 25
    "Lizard", // 26
    "Renegade", // 27
    "Ginkgo", // 28
    "Minic", // 29
    "Altair", // 30
    "Viridithas", // 31
    "Devre", // 32
]

const paring = [
    // Round 32
    [[seed[1], seed[32]], "kDvuBQvK"], // Match 1
    [[seed[17], seed[16]], "L1p0Pk3o"], // Match 2
    [[seed[9], seed[24]], "u8ZUXrjz"], // Match 3
    [[seed[25], seed[8]], "JhUClQ3q"], // Match 4
    [[seed[5], seed[28]], "sA7SQoPk"], // Match 5
    [[seed[21], seed[12]], "BlkYnKOD"], // Match 6
    [[seed[13], seed[20]], "d4dZ7818"], // Match 7
    [[seed[29], seed[4]], "W4tWaIuR"], // Match 8
    [[seed[3], seed[30]], "bnpC1kCW"], // Match 9
    [[seed[19], seed[14]], "HSn0n8nh"], // Match 10
    [[seed[11], seed[22]], "BypTJAy1"], // Match 11
    [[seed[27], seed[6]], "G7PKJ7Zx"], // Match 12
    [[seed[7], seed[26]], "cIjRCsxf"], // Match 13
    [[seed[23], seed[10]], "7bCF3k2b"], // Match 14
    [[seed[15], seed[18]], "0J6ubcQ4"], // Match 15
    [[seed[31], seed[2]], "621TlrK9"], // Match 16

    //Round 16
    [[seed[0], seed[0]], "B58ovSQU"], // Match 1
    [[seed[0], seed[0]], "pNG5UIWg"], // Match 2
    [[seed[0], seed[0]], "rQdSdJiI"], // Match 3
    [[seed[0], seed[0]], "ZpXSiTaf"], // Match 4
    [[seed[0], seed[0]], "qNm2Urxl"], // Match 5
    [[seed[0], seed[0]], "ElBZMblR"], // Match 6
    [[seed[0], seed[0]], "JykQLa3c"], // Match 7
    [[seed[0], seed[0]], "Vmnr4qJW"], // Match 8

    // Quarterfinals
    [[seed[0], seed[0]], "vOrgdhPg"], // Match 1
    [[seed[0], seed[0]], "DlXNHhie"], // Match 2
    [[seed[0], seed[0]], "3p0O0wlI"], // Match 3
    [[seed[0], seed[0]], "L44jWgVE"], // Match 4

    // Semifinals
    [[seed[0], seed[0]], "w4fjiksD"], // Match 1
    [[seed[0], seed[0]], "mGHkYzya"], // Match 2

    // Bronze & Final
    [[seed[0], seed[0]], "OIjRBuhM"], // Bronze
    [[seed[0], seed[0]], "tdiYq8Vl"], // Final
]

const fetchTCECpgn = () => {
    return fetch("https://tcec-chess.com/evalbotelo/plainlive.pgn", {
        headers: {
            "User-Agent": "github.com/SergioGlorias/reverse-mule"
        }
    })
        .then(res => {
            if (res.status !== 200) return null
            return res.text()
        })
        .then(pgn => parsePgn(pgn)[0])
        .then(pgn => {
            pgn.headers.set("WhiteTitle", "BOT")
            pgn.headers.set("BlackTitle", "BOT")
            pgn.headers.set("WhiteFideId", "0")
            pgn.headers.set("BlackFideId", "0")
            return pgn
        })
        .catch(() => null)
}

const pushPGN = (pgn, id) => {
    return fetch(`https://lichess.org/broadcast/round/${id}/push`, {
        body: pgn,
        method: "POST",
        headers: {
            Authorization: "Bearer " + litoken,
            "User-Agent": "Reverse Mule by SergioGlorias/reverse-mule"
        }
    })
        .then(res => res.json())
        .catch(() => null)
}


const run = async () => {
    console.log("=== FETCH ===")
    const pgn = await fetchTCECpgn()
    if (!pgn) return

    const white = pgn.headers.get("White")
    const black = pgn.headers.get("Black")

    console.log(`Match: ${white} - ${black}`)

    const id = paring.find(p => p[0].filter(e => white.includes(e) || black.includes(e)).length == 2)

    console.log(`ID: ${id}`)

    if (!id) return

    const pgnText = makePgn(pgn)

    const r = await pushPGN(pgnText, id[1])

    if (r) console.info(r)
    else console.error("Fail Push")

    console.log("=========")
}

console.log("===== CODE STARTED =====")
setInterval(() => run(), 3 * 1000)