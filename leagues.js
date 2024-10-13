import { parsePgn, makePgn, ChildNode, Node } from "chessops/pgn";
import process from "node:process";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
dayjs.extend(duration);

const litoken = process.env.LICHESS_TOKEN;

const Rounds = {
  entrance: [
    "ID_1", // 1
  ],
  league2: [
    "ID_1", // 1
  ],
  league1: [
    "ID_1", // 1
  ],
  divisionP: [
    "ID_1", // 1
  ],
  superfinal: [
    "ID_1", // 1
  ],
};

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

  let e = event.toLowerCase();
  if (e.includes("testing")) return;
  if (!e.includes("s27")) return;

  let roundLeague;

  if (e.includes("entrace")) roundLeague = Rounds.entrance;
  else if (e.includes("league 2")) roundLeague = Rounds.league2;
  else if (e.includes("league 1")) roundLeague = Rounds.league1;
  else if (e.includes("division")) roundLeague = Rounds.divisionP;
  else if (e.includes("Superfinal")) roundLeague = Rounds.superfinal;

  if (roundLeague == undefined) return;

  const roundN = pgn.headers.get("Round").split(".")[0];

  const white = pgn.headers.get("White");
  const black = pgn.headers.get("Black");
  const tc = pgn.headers.get("TimeControl");

  console.log(`Match: ${white} - ${black}`);

  const moves = [];

  for (let m of pgn.moves.mainline()) {
    if (m.comments) {
      let i = m.comments[0].split(", ").find((c) => c.includes("tl="));
      if (i) {
        i = i.split("=")[1];

        const time = dayjs.duration(parseInt(i), "milliseconds");
        const hours = time.hours();
        const minutes = time.minutes();
        const seconds = time.seconds();
        m.comments = [`[%clk ${hours}:${minutes}:${seconds}]`];
      } else if (m.comments[0].includes("book,") && tc) {
        let t = tc.split("+")[0];
        const time = dayjs.duration(parseInt(t), "seconds");
        const hours = time.hours();
        const minutes = time.minutes();
        const seconds = time.seconds();
        m.comments = [`[%clk ${hours}:${minutes}:${seconds}]`];
      } else {
        m.comments = [];
      }
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

  console.log(pgnText);

  const r = await pushPGN(pgnText, roundLeague[parseInt(roundN)-1]);

  if (r) console.info(r);
  else console.error("Fail Push");

  console.log("=========");
};

console.log("===== CODE STARTED =====");
setInterval(() => run(), 3 * 1000);
