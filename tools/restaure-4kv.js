import { parsePgn, makePgn, ChildNode, Node } from "chessops/pgn";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
dayjs.extend(duration);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const litoken = process.env.LICHESS_TOKEN;

const Rounds = {
  pool: [
    "PtL0izfR",
    "SYy4fjm0",
    "Fd9iXaEd",
    "3mBu2Aoy",
    "uSZBhTNc",
    "Q5hGXOk8",
    "3bS1dGF2",
    "dff02sR1",
    "3tGoYifE",
    "YRCLHD49",
    "Z40sbI65",
    "BleATUA6",
    "ZbRnh1Lm",
    "ngkNZZH1",
    "KiMR83jf",
    "73XbzQzH",
    "pcf1bJFN",
    "lHOfPKMU",
    "iNjZISt1",
    "8QRc9IiI",
    "EKw32hFC",
    "9MHxT7u2",
    "PveHeccZ",
    "mks8eD6r",
    "FaI2vgPw",
    "HTCCfIEA",
    "ADpiTvy0",
    "2DBcMG3f",
    "LIYF4hhO",
    "KDktSo57",
    "ZHLlA8kc",
    "Ajj10zf7",
    "Am62Y5xN",
    "FkruWnG5",
    "Bw83bvbM",
    "l3dwXytR",
    "suVUIzqm",
    "V7RbEaSm",
    "tORpePC0",
    "JWmWpa7y",
    "qWhR94L6",
    "1nzEqHxe",
    "YY60uodW",
    "BOJhiic9",
    "7zuExEal",
    "Qj0HdElY",
    "IM7xpslL",
    "cx7LYEFO",
    "CNpFeqP7",
    "SiBDKgg6",
    "V2fn6IsQ",
    "KDpKuxE7",
    "0lrbr4cu",
    "MyM7YxSV",
    "6sE4LxNs",
    "UBiF1jUa",
  ],
  final: [],
};

const fetchTCECpgn = () => {
  return (
    fetch("https://tcec-chess.com/evalbotelo/archive.pgn", {
      headers: {
        "User-Agent": "github.com/SergioGlorias/reverse-mule",
      },
    })
      .then((res) => {
        if (res.status !== 200) return null;
        return res.text();
      })
      .then((pgn) => parsePgn(pgn))
      .catch(() => null)
  );
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
    .then((res) => {
      console.log(res.status);
      return res.json();
    })
    .catch((res) => {
      console.error(res);
      return null;
    });
};

const run = async () => {
  console.log("=== FETCH ===");
  const pgns = await fetchTCECpgn();
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
    if (!e.includes("4k v")) continue;

    const roundN = pgn.headers.get("Round").split(".")[0];

    let roundLeague;

    let aN = parseInt(roundN) - 1;

    if (e === "TCEC Season 28 - 4K V".toLowerCase()) roundLeague = Rounds.pool[aN];
    else roundLeague = Rounds.final[aN];

    if (roundLeague == undefined) continue;

    const white = pgn.headers.get("White");
    const black = pgn.headers.get("Black");
    const tc = pgn.headers.get("TimeControl");

    console.log(`Match: ${white} - ${black}`);

    const terminationDetails = pgn.headers.get("TerminationDetails");
    const termination = pgn.headers.get("Termination");

    if (terminationDetails) {
      if (termination)
        pgn.headers.set(
          "Termination",
          `${termination} - ${terminationDetails}`
        );
      else pgn.headers.set("Termination", terminationDetails);
    }

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

    const r = await pushPGN(pgnText, roundLeague);

    if (r) console.info(r);
    else console.error("Fail Push");

    console.log("=========");

    await delay(5000);
  }
};

console.log("===== CODE STARTED =====");
run();
