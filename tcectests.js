import { pgnEdit } from "./TCEC-Funcion/pgn-edit.js";
import { fetchTCECpgnLive } from "./TCEC-Funcion/pgn-get.js";
import { LichessPushPGN } from "./TCEC-Funcion/pgn-push.js";

const run = async () => {
  console.log("=== FETCH ===");
  const pgn = await fetchTCECpgnLive();
  if (!pgn) return;

  const event = pgn.headers.get("Event");

  console.log(`Event: ${event}`);

  let roundLeague;

  roundLeague = "dTCh3uZH" 

  if (roundLeague == undefined) return;

  const pgnText = pgnEdit(pgn);

  console.log(pgnText);

  const r = await LichessPushPGN(pgnText, roundLeague);

  if (r) console.info(r);
  else console.error("Fail Push");

  console.log("=========");
};

console.log("===== CODE STARTED =====");
setInterval(() => run(), 5 * 1000);
