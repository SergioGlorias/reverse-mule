import { parsePgn, makePgn } from 'chessops/pgn';
import process from 'node:process';

const litoken = process.env.LICHESS_TOKEN

const seed = [ // maybe need update
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

    "Texel", // 9 - r01
    "Stormphrax", // 10 - r02
    "Seer", // 11 - r03
    "Caissa", // 12 - r04
    "RubiChess", // 13 - r05 
    "PlentyChess", // 14 - r06
    "DeepSjeng", // 15 - r07
    "Arasan", // 16 - r08
    "Uralochka", // 17 - r09
    "akimbo", // 18 - r10
    "Equisetum", // 19 - r11
    "Booot", // 20 - r12
    "StoofVlees", // 21 - r13
    "BlackMarlin", // 22 - r14
    "Velvet", // 23 - r15
    "Igel", // 24 - r16
    "Tucano", // 25 - r17
    "Lizard", // 26 - r18
    "Renegade", // 27 - r19
    "Ginkgo", // 28 - r20
    "Minic", // 29 - r21
    "Altair", // 30 - r22
    "Viridithas", // 31 - r23
    "Devre", // 32 - r24
]

const paring = [
    [["Stockfish_15_100M", "Obsidian dev-13.23"], "vu0hvi1p"],
    [["Stockfish_15_100M", "LCZero 0.31-dag-4167c1e-BT4-6147500-it332"], "wulYcqx9"],
    [["Ceres 1.0_768x15_NLA", "Stockfish_15_100M"], "5ZWpTgAo"],
]

const fetchTCECpgn = () => {
    return fetch("https://tcec-chess.com/evalbotelo/plainlive.pgn")
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
            Authorization: "Bearer " + litoken
        }
    })
    .then(res => res.json())
    .catch(() => null)
}


const run = async () => {
    const pgn = await fetchTCECpgn()
    if (!pgn) return

    const white = pgn.headers.get("White")
    const black = pgn.headers.get("Black")

    console.log(`Match: ${white} - ${black}`)

    const id = paring.find(p => p[0].includes(white) && p[0].includes(black))

    console.log(`ID: ${id}`)

    if (!id) return

    const pgnText = makePgn(pgn)

    const r = await pushPGN(pgnText, id[1])

    if (r) console.info(r)
    else console.error("Fail Push")
}

setInterval(() => run(), 3*1000)
run()