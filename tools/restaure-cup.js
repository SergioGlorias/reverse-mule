import { pgnEdit } from "../TCEC-Funcion/pgn-edit.js";
import { fetchTCECpgnArchive } from "../TCEC-Funcion/pgn-get.js";
import { LichessPushPGN } from "../TCEC-Funcion/pgn-push.js";
import { roundChesck } from "../TCEC-Checks/cup.js";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const run = async () => {
    console.log("=== FETCH ===");
    const pgns = await fetchTCECpgnArchive();
    if (!pgns) return;

    for (const pgn of pgns) {
        pgn.headers.set("WhiteTitle", "BOT");
        pgn.headers.set("BlackTitle", "BOT");
        pgn.headers.set("WhiteFideId", "0");
        pgn.headers.set("BlackFideId", "0");

        const event = pgn.headers.get("Event");

        console.log(`Event: ${event}`);

        let e = event.toLowerCase();
        if (e.includes("testing")) continue;
        if (!e.includes("cup 16")) continue;

        const roundN = pgn.headers.get("Round").split(".")[1];
        pgn.headers.set("Round", roundN.toString());

        const white = pgn.headers.get("White");
        const black = pgn.headers.get("Black");
        const id = roundChesck(white, black);

        if (id == undefined) continue;
        const pgnText = pgnEdit(pgn);

        console.log(pgnText);

        const r = await LichessPushPGN(pgnText, id[1]);

        if (r) console.info(r);
        else console.error("Fail Push");

        console.log("=========");

        await delay(5000);
    }
    console.log("No more PGNs to process.");
};

console.log("===== CODE STARTED =====");

const loop = async () => {
    while (true) {
        await run();
        await new Promise(res => setTimeout(res, 10 * 60 * 1000)); // 10 minutes
    }
};

console.log("===== CODE STARTED =====");
loop();
