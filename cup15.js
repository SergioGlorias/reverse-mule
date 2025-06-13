import { parsePgn, makePgn, Node, ChildNode } from "chessops/pgn";
import process from "node:process";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
dayjs.extend(duration);

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
  [[seed[1], seed[9]], "Q56XqQTZ"], // Match 1: Stockfish vs BlackMarlin
  [[seed[10], seed[11]], "qcSVN8wb"], // Match 2: Reckless vs Ginkgo
  [[seed[5], seed[12]], "LgYG2dAl"], // Match 3: PlentyChess vs sirius
  [[seed[13], seed[14]], "4sqKqFP6"], // Match 4: rofChade vs Stormphrax
  [[seed[3], seed[15]], "q6rkAaMO"], // Match 5: Berserk vs Uralochka
  [[seed[16], seed[17]], "lqTa6Jug"], // Match 6: Horsie vs Ceres
  [[seed[7], seed[18]], "cy7PmKty"], // Match 7: Ethereal vs Arasan
  [[seed[19], seed[20]], "Y3hdAN22"], // Match 8: Viridithas vs Clover
  [[seed[2], seed[21]], "iN2xV42G"], // Match 9: LCZero vs RubiChess
  [[seed[22], seed[23]], "Cm7DSWv5"], // Match 10: Velvet vs Booot
  [[seed[6], seed[24]], "pgZZsKdS"], // Match 11: KomodoDragon vs Stoofvlees
  [[seed[25], seed[26]], "IrhoSsHN"], // Match 12: Caissa vs Igel
  [[seed[4], seed[27]], "ndR0kGRs"], // Match 13: Obsidian vs Renegade
  [[seed[28], seed[29]], "ecQzqoWm"], // Match 14: ScopioNN vs Revenge
  [[seed[8], seed[30]], "SIYEwiO5"], // Match 15: Integral vs Starzix
  [[seed[31], seed[32]], "nsdhku8R"], // Match 16: Seer vs Altair

  //Round 16
  [[seed[1], seed[11]], "e2OeA4DF"], // Match 1: Stockfish vs Ginkgo
  [[seed[5], seed[14]], "CbiO5yLw"], // Match 2: PlentyChess vs Stormphrax
  [[seed[3], seed[17]], "A6lWj6Du"], // Match 3: Berserk vs Ceres
  [[seed[7], seed[19]], "tZt9Lzkz"], // Match 4: Ethereal vs Viridithas
  [[seed[2], seed[23]], "LwxGkx22"], // Match 5: LCZero vs Booot
  [[seed[6], seed[25]], "J7bCRq4m"], // Match 6: KomodoDragon vs Caissa
  [[seed[4], seed[29]], "PCIH17lX"], // Match 7: Obsidian vs Revenge
  [[seed[8], seed[31]], "ZwuoDGte"], // Match 8: Integral vs Seer

  // Quarterfinals
  [[seed[1], seed[5]], "wSLt7kAA"], // Match 1: Stockfish vs PlentyChess
  [[seed[3], seed[7]], "uqaaiUUd"], // Match 2: Berserk vs Ethereal
  [[seed[0], seed[0]], "1uoshGBs"], // Match 3
  [[seed[0], seed[0]], "CFFTv2dy"], // Match 4

  // Semifinals
  [[seed[0], seed[0]], "6wRXB7bM"], // Match 1
  [[seed[0], seed[0]], "8fBXtCYx"], // Match 2

  // Bronze & Final
  [[seed[0], seed[0]], "HeJaCCEf"], // Bronze
  [[seed[0], seed[0]], "HeJaCCEf"], // Bronze - alternative
  [[seed[0], seed[0]], "niV1sF1a"], // Final
  [[seed[0], seed[0]], "niV1sF1a"], // Final - alternative
];

const fetchTCECpgn = () => {
  return fetch("https://tcec-chess.com/evalbotelo/live.pgn", {
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
  return fetch(`https://lichess.org/api/broadcast/round/${id}/push`, {
    body: pgn,
    method: "POST",
    headers: {
      Authorization: "Bearer " + litoken,
      "User-Agent": "Reverse Mule by SergioGlorias/reverse-mule",
    },
  })
    .then((res) => res.text())
    .catch(() => null);
};

const run = async () => {
  if (!litoken) {
    console.error("LICHESS_TOKEN não definido!");
    process.exit(1);
  }
  console.log("=== FETCH ===");
  const pgn = await fetchTCECpgn();
  if (!pgn) return;

  const event = pgn.headers.get("Event");

  console.log(`Event: ${event}`);

  if (!event.toLowerCase().includes("cup 15")) return;

  if (event.toLowerCase().includes("testing")) return;

  const roundN = pgn.headers.get("Round").split(".")[1];

  pgn.headers.set("Round", roundN.toString());

  const white = pgn.headers.get("White");
  const black = pgn.headers.get("Black");
  const tc = pgn.headers.get("TimeControl");

  console.log(`Match: ${white} - ${black}`);

  const terminationDetails = pgn.headers.get("TerminationDetails");
  const termination = pgn.headers.get("Termination");

  if (terminationDetails) {
    if (termination)
      pgn.headers.set("Termination", `${termination} - ${terminationDetails}`);
    else pgn.headers.set("Termination", terminationDetails);
  }

  const moves = [];

  for (let m of pgn.moves.mainline()) {
    let clk = null;
    if (m.comments && m.comments[0]) {
      const comment = m.comments[0];
      const tlMatch = comment.match(/tl=(\d+)/);
      if (tlMatch) {
        clk = dayjs.duration(Number(tlMatch[1]), "milliseconds");
      } else if (comment.includes("book,") && tc) {
        const t = tc.split("+")[0];
        clk = dayjs.duration(Number(t), "seconds");
      }
    }
    if (clk) {
      const h = clk.hours();
      const mnt = clk.minutes();
      const s = clk.seconds();
      m.comments = [`[%clk ${h}:${mnt}:${s}]`];
    } else if (m.comments) {
      m.comments = [];
    }
    moves.push(m);
  }

  const pgg = {
    headers: pgn.headers,
    moves: new Node(),
  };

  let node = pgg.moves;

  moves.forEach((d) => {
    const newNode = new ChildNode(d);
    node.children = [newNode];
    node = newNode;
  });

  const pgnText = makePgn(pgg);

  const id = paring.find((p) =>
    p[0].every((e) =>
      [white, black].some((name) =>
        name.toLowerCase().includes(e.toLowerCase())
      )
    )
  );

  console.log(`ID: ${id}`);

  if (!id) return;
  const res = await pushPGN(pgnText, id[1]);
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
