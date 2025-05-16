import { parsePgn, makePgn, ChildNode, Node } from "chessops/pgn";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
dayjs.extend(duration);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const litoken = process.env.LICHESS_TOKEN;

const Rounds = {
  playoff3: [
    "FMtie9do",
    "Uup2IbRB",
    "c3c0saR9",
    "av4K4lyo",
    "BziEWBP5",
    "RtumXijB",
    "jlDsdCwV",
    "eFFyjod1",
    "wIuRdQqZ",
    "bKp8ZK8D",
    "YD2EdmHY",
    "t8Porugb",
    "kb0OYElW",
    "vhRShxzy",
    "LTzxgwZC",
    "COoZx19G",
    "TYsy0OR3",
    "OQV8aQqd",
    "PHH15uH5",
    "AZzD2NvB",
    "2hrejJWL",
    "MIi8m7Cs",
    "Grm37ADi",
    "b9vUn7cT",
    "s1sGj18x",
    "P5KOXcPx",
    "JEPwGNhG",
    "0Cwow456",
    "7DPBfVyV",
    "HqNHKCvr",
    "FFa8Vyv2",
    "NxCgoqLA",
    "T3K9QHkR",
    "iWdGAKJz",
    "9FKVA0kx",
    "WhYEJCb8",
    "rBSihupZ",
    "m8mD8GwX",
    "eLqURrPJ",
    "rYkNm80v",
    "o7a6Q5Jz",
    "zWwz2RJk",
    "85PGg2HJ",
    "G9YrjR26",
    "Bw5ApuYE",
    "pJCReFwq",
    "8gawbMKh",
    "mLaU1K08",
    "Hpbl6jbl",
    "CFPpPNBa",
    "XjuT5sgJ",
    "sN3hbe9I",
    "aUsLsnC0",
    "bjocZFk6",
    "GIwCZnfD",
    "m0O0hq22",
  ],
  playoff2: [
    "05bQcs60",
    "zfsbrVx2",
    "V7vAUubo",
    "IL6WzFyK",
    "ll4VGmUS",
    "kC7upYaw",
    "OE01rLph",
    "1zfvQUiq",
    "nOjbifzy",
    "t2MgQPqm",
    "4QXAtBLT",
    "u92lhZNR",
    "oEDUItD5",
    "OC0cWff0",
    "8oLJ4oDN",
    "Y8HWVHwp",
    "8F3FdSXs",
    "CoKeYcwp",
    "vAozP9E1",
    "4lsroIuv",
    "uDvlqkRq",
    "neiK3sW7",
    "b5EmKTbt",
    "e9WWCu8z",
    "W2Pjbgju",
    "f15JJ93R",
  ],
  swiss: [
    "DV7xvNXd",
    "bkhTixaH",
    "pUb6og3m",
    "ANKrJoso",
    "T7mJwDUS",
    "hP7oLX6D",
    "y3Syaazl",
    "6XGObQDy",
    "kX6DCs9T",
    "GdK93YSo",
    "65pHQefp",
  ],
};

const fetchTCECpgn = () => {
  return fetch("https://tcec-chess.com/evalbotelo/archive.pgn", {
    headers: {
      "User-Agent": "github.com/SergioGlorias/reverse-mule",
    },
  })
    .then((res) => {
      if (res.status !== 200) return null;
      return res.text();
    })
    .then((pgn) => parsePgn(pgn))
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

    const roundN = pgn.headers.get("Round").split(".")[0];

    let roundLeague;

    let aN = parseInt(roundN) - 1;

    if (e === "TCEC Season 28 - Category 3 Playoff".toLowerCase())
      roundLeague = Rounds.playoff3[aN];
    else if (e === "TCEC Season 28 - Category 2 Playoff".toLowerCase())
      roundLeague = Rounds.playoff2[aN];
    else if (e === "TCEC Season 28 - Swiss 8".toLowerCase())
      roundLeague = Rounds.swiss[aN];

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

    pgn.headers.delete("TerminationDetails");

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
