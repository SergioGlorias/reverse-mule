import { pgnEdit } from "../TCEC-Funcion/pgn-edit.js";
import { fetchTCECpgnArchive } from "../TCEC-Funcion/pgn-get.js";
import { LichessPushPGN } from "../TCEC-Funcion/pgn-push.js";
import { roundChesck } from "../TCEC-Checks/FRD.js";

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
    if (!e.includes("frd 4")) continue;

    const roundN = pgn.headers.get("Round").split(".")[0];

    let aN = parseInt(roundN) - 1;

    const roundLeague = roundChesck(aN, e);

    if (roundLeague == undefined) continue;

    const pgnText = pgnEdit(pgn);

    console.log(pgnText);

    const r = await LichessPushPGN(pgnText, roundLeague);

    if (r) console.info(r);
    else console.error("Fail Push");

    console.log("=========");

    await delay(5000);
  }
};

console.log("===== CODE STARTED =====");
run();
