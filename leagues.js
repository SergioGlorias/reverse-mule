import { pgnEdit } from "./TCEC-Funcion/pgn-edit.js";
import { fetchTCECpgnLive } from "./TCEC-Funcion/pgn-get.js";
import { LichessPushPGN } from "./TCEC-Funcion/pgn-push.js";
import { roundChesck } from "./TCEC-Checks/league.js";

const run = async () => {
  console.log("=== FETCH ===");
  const pgn = await fetchTCECpgnLive();
  if (!pgn) return;

  const event = pgn.headers.get("Event");

  console.log(`Event: ${event}`);

  let e = event.toLowerCase();
  if (e.includes("testing")) return;
  if (!e.includes("29")) return;

  const roundN = pgn.headers.get("Round").split(".")[0];

  let roundLeague;

  let aN = parseInt(roundN) - 1;

  roundLeague = roundChesck(aN, e);

  if (roundLeague == undefined) return;

  const pgnText = pgnEdit(pgn);

  console.log(pgnText);

  const r = await LichessPushPGN(pgnText, roundLeague);

  if (r) console.info(r);
  else console.error("Fail Push");

  console.log("=========");
};

console.log("===== CODE STARTED =====");
const loop = async () => {
  while (true) {
    await run();
    await new Promise(res => setTimeout(res, 3000));
  }
};

loop();