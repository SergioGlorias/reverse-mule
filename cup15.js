import { parsePgn, makePgn } from "chessops/pgn";
import process from "node:process";

const litoken = process.env.LICHESS_TOKEN;

const seed = [
  "TBA", // 0
  "Stockfish", // 1
  "LCZero", // 2
  "Berserk", // 3
  "Obsidian", // 4
  "PlentyChess", // 5
  "KomodoDragon", // 6
  "Ethereal", // 7
  "Integral", // 8

  // RANDOM SEED

  "BlackMarlin", // 9 - r01
  "Reckless", // 10 - r02
  "Ginkgo", // 11 - r03
  "sirius", // 12 - r04
  "rofChade", // 13 - r05
  "Stormphrax", // 14 - r06
  "Uralochka", // 15 - r07
  "Horsie", // 16 - r08
  "Ceres", // 17 - r09
  "Arasan", // 18 - r10
  "Viridithas", // 19 - r11
  "Clover", // 20 - r12
  "RubiChess", // 21 - r13
  "Velvet", // 22 - r14
  "Booot", // 23 - r15
  "Stoofvlees", // 24 - r16
  "Caissa", // 25 - r17
  "Igel", // 26 - r18
  "Renegade", // 27 - r19
  "ScopioNN", // 28 - r20
  "Revenge", // 29 - r21
  "Starzix", // 30 - r22
  "Seer", // 31 - r23
  "Altair", // 32 - r24
];

const paring = [
  // Round 32
  [[seed[1], seed[9]], "kDvuBQvK"], // Match 1
  [[seed[10], seed[11]], "L1p0Pk3o"], // Match 2
  [[seed[5], seed[12]], "u8ZUXrjz"], // Match 3
  [[seed[13], seed[14]], "JhUClQ3q"], // Match 4
  [[seed[3], seed[15]], "sA7SQoPk"], // Match 5
  [[seed[16], seed[17]], "BlkYnKOD"], // Match 6
  [[seed[7], seed[18]], "d4dZ7818"], // Match 7
  [[seed[19], seed[20]], "W4tWaIuR"], // Match 8
  [[seed[2], seed[21]], "bnpC1kCW"], // Match 9
  [[seed[22], seed[23]], "HSn0n8nh"], // Match 10
  [[seed[6], seed[24]], "BypTJAy1"], // Match 11
  [[seed[25], seed[26]], "G7PKJ7Zx"], // Match 12
  [[seed[4], seed[27]], "cIjRCsxf"], // Match 13
  [[seed[28], seed[29]], "7bCF3k2b"], // Match 14
  [[seed[8], seed[30]], "0J6ubcQ4"], // Match 15
  [[seed[31], seed[32]], "621TlrK9"], // Match 16

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
  [[seed[0], seed[0]], "OIjRBuhM"], // Bronze - alternative
  [[seed[0], seed[0]], "tdiYq8Vl"], // Final
  [[seed[0], seed[0]], "tdiYq8Vl"], // Final - alternative
];

const fetchTCECpgn = () => {
  return fetch("https://tcec-chess.com/evalbotelo/plainlive.pgn", {
    headers: {
      "User-Agent": "github.com/SergioGlorias/reverse-mule",
    },
  })
    .then((res) => {
      if (res.status !== 200) return null;
      return res.text();
    })
    .then((pgn) => parsePgn(pgn)[0])
    .then((pgn) => {
      pgn.headers.set("WhiteTitle", "BOT");
      pgn.headers.set("BlackTitle", "BOT");
      pgn.headers.set("WhiteFideId", "0");
      pgn.headers.set("BlackFideId", "0");
      return pgn;
    })
    .catch(() => null);
};

const pushPGN = (pgn, id) => {
  return fetch(`https://lichess.org/broadcast/round/${id}/push`, {
    body: pgn,
    method: "POST",
    headers: {
      Authorization: "Bearer " + litoken,
      "User-Agent": "Reverse Mule by SergioGlorias/reverse-mule",
    },
  })
    .then((res) => res.json())
    .catch(() => null);
};

const run = async () => {
  console.log("=== FETCH ===");
  const pgn = await fetchTCECpgn();
  if (!pgn) return;

  const event = pgn.headers.get("Event");

  console.log(`Event: ${event}`);

  if (!event.toLowerCase().includes("cup 14")) return;

  if (event.toLowerCase().includes("testing")) return;

  const roundN = pgn.headers.get("Round").split(".")[1];

  pgn.headers.set("Round", roundN.toString());

  const white = pgn.headers.get("White");
  const black = pgn.headers.get("Black");

  console.log(`Match: ${white} - ${black}`);

  const id = paring.find(
    (p) =>
      p[0].filter(
        (e) =>
          white.toLowerCase().includes(e.toLowerCase()) ||
          black.toLowerCase().includes(e.toLowerCase())
      ).length == 2
  );

  console.log(`ID: ${id}`);

  if (!id) return;

  const pgnText = makePgn(pgn);

  const r = await pushPGN(pgnText, id[1]);

  if (r) console.info(r);
  else console.error("Fail Push");

  console.log("=========");
};

console.log("===== CODE STARTED =====");
setInterval(() => run(), 3 * 1000);
