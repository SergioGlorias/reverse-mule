import { pgnEdit } from "./TCEC-Funcion/pgn-edit.js";
import { fetchTCECpgnLive } from "./TCEC-Funcion/pgn-get.js";
import { LichessPushPGN } from "./TCEC-Funcion/pgn-push.js";
import { roundChesck } from "./TCEC-Checks/FRD.js";

const run = async () => {
  console.log("=== FETCH ===");
  const pgn = await fetchTCECpgnLive();
  if (!pgn) return;

  const event = pgn.headers.get("Event");

  console.log(`Event: ${event}`);

  let e = event.toLowerCase();
  if (e.includes("testing")) return;
  if (!e.includes("frd 4")) return;

  const roundN = pgn.headers.get("Round").split(".")[0];

  let aN = parseInt(roundN) - 1;

  const roundLeague = roundChesck(aN, e);

  if (roundLeague == undefined) return;

  const pgnText = pgnEdit(pgn);

  console.log(pgnText);

  const r = await LichessPushPGN(pgnText, roundLeague);

  if (r) console.info(r);
  else console.error("Fail Push");

  console.log("=========");
};

const loop = async () => {
  while (true) {
    await run();
    await new Promise(res => setTimeout(res, 3000));
  }
};

console.log("===== CODE STARTED =====");
loop();
