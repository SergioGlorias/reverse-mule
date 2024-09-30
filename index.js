import { parsePgn, makePgn } from 'chessops/pgn';
import process from 'node:process';

const litoken = process.env.LICHESS_TOKEN

const paring = [
    [["Stockfish_15_10M", "Velvet 8.1.0-dev1"], "id"],
    [["Stockfish_17", "Velvet-dev1"], "id2"],
    [["Stockfish_6_10M", "Velvet 80-dev1"], "id3"],
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

    const id = paring.find(p => p[0].includes(white) && p[0].includes(black))[1]

    console.log(`ID: ${id}`)

    if (!id) return

    const pgnText = makePgn(pgn)

    const r = await pushPGN(pgnText, id)

    if (r) console.info(r)
    else console.error("Fail Push")
}

run()