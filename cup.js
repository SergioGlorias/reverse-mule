import process from "node:process";
import { roundChesck } from "./TCEC-Checks/cup";
import { pgnEdit } from "./TCEC-Funcion/pgn-edit";
import { fetchTCECpgn } from "./TCEC-Funcion/pgn-get";
import { LichessPushPGN } from "./TCEC-Funcion/pgn-push";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
dayjs.extend(duration);

const litoken = process.env.LICHESS_TOKEN;

const run = async () => {
  console.log("=== FETCH ===");
  const pgn = await fetchTCECpgn();
  if (!pgn) return;

  const event = pgn.headers.get("Event");

  console.log(`Event: ${event}`);

  if (!event.toLowerCase().includes("cup 16")) return;
  if (event.toLowerCase().includes("testing")) return;

  const white = pgn.headers.get("White");
  const black = pgn.headers.get("Black");
  const id = roundChesck(white, black);

  console.log(`ID: ${id}`);

  if (!id) return;

  const roundN = pgn.headers.get("Round").split(".")[1];
  pgn.headers.set("Round", roundN.toString());
  const pgnText = pgnEdit(pgn);


  const res = await LichessPushPGN(pgnText, id[1]);
  console[res ? "info" : "error"](res || "Fail Push");

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
