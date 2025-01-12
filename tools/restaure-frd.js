import { parsePgn, makePgn, ChildNode, Node } from "chessops/pgn";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
dayjs.extend(duration);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const litoken = process.env.LICHESS_TOKEN;

const Rounds = {
  leagueA: [
    "1t6pGsl7",
    "Wqdo1Foo",
    "r4MD1lev",
    "YSWvNPyL",
    "DPGasIA6",
    "byHd5yzQ",
    "usic4EPf",
    "bCNwZH4b",
    "h7UrTvrw",
    "jiDiYKAv",
    "UxxxfUs0",
    "qCbJAVD5",
    "28rCr6yl",
    "hrUVmm7R",
    "rpnk4zOb",
    "Ic1yscSG",
    "civYTakY",
    "BOi7dDGt",
    "1k7wgty5",
    "eyDFg4OZ",
  ],
  leagueB: [
    "kvXg9aQj",
    "kGTt950t",
    "VhxEXfMA",
    "MFub18i5",
    "iq40Uc2L",
    "DkGP16Pn",
    "ruhcYcBa",
    "p3X2Db79",
    "1j0MwYiB",
    "zJl4Dssy",
    "Yq6PGu6P",
    "kN6NgBDL",
    "Mb7c2zXX",
    "uSCA6slq",
    "akRZ0Mcm",
    "iK3lUkJt",
    "gJVMxstN",
    "9RXHpZL7",
    "a23YnTR1",
    "2n2zvRGn",
  ],
  leagueC: [
    "VjawZKdU",
    "UasdPsDx",
    "BBTPYeLP",
    "UQ7THPJ4",
    "YkTpZ335",
    "zSqlqb8X",
    "CBr9kFcX",
    "04KpUr3E",
    "fsj8vX0m",
    "Xu57PNoW",
    "tkcMVX1F",
    "HW2430rO",
    "b4wWL3Sp",
    "eizBaJRv",
    "phc29jhH",
    "nJRDD6mQ",
    "R7CaKoP1",
    "G0ibeeQ7",
    "UsfhsPUx",
    "WBY2dRC1",
  ],
  leagueD: [
    "JtOSM1wm",
    "FJ2EUfNj",
    "EIUxLeuz",
    "perzYj9k",
    "GJChhEwV",
    "5iUfIps7",
    "NWaRxrUF",
    "Vz7Qr23n",
    "rkg6nOsI",
    "Uv2CfbDT",
    "MgztMRbX",
    "5sBizb5R",
    "hQCzVN34",
    "BQWXw7nd",
    "mETX7m2K",
    "J1n3gpi1",
    "z9YEGZlB",
    "oWkETfsj",
    "K8WUVpbo",
    "42dYSvGq",
  ],
  semileague1: [
    "JzKuZWvs",
    "erFdttqt",
    "POqlHeYz",
    "FiSeIltB",
    "F8kG5HIV",
    "EqveDtHQ",
    "JhsBCqiy",
    "TAfj2OZt",
    "G30a2juV",
    "7IwHtu8r",
    "cYexiZc7",
    "pIoildJO",
    "dirxLiUl",
    "RSxOt8dq",
    "H7FXa5hx",
    "rOhR3RF6",
    "irgstHUW",
    "5DWPOB9c",
    "BMBiDMrP",
    "58RaABZb",
  ],
  semileague2: [
    "3Mba9Key",
    "9xK3zzP9",
    "iAogrTvU",
    "eKupP8LM",
    "Bdx4RCth",
    "APvvR1P8",
    "m0PLzLE0",
    "BZfheLSw",
    "kJKn5WSK",
    "ghZr587g",
    "La7RgU2t",
    "AJoDldzY",
    "WKfCUryq",
    "E2zq8u6v",
    "B58rauor",
    "02zyP6Cc",
    "mO6Yj7iU",
    "gYZnNVDi",
    "1fky15RO",
    "41BzTGCI",
  ],
  finalLeague: [
    "lEJWKiFq",
    "ZSesL0el",
    "eFuwYf1X",
    "0EFwBR4m",
    "3Fb2QBuu",
    "pYUx2p6R",
    "B2vLzl48",
    "hMfaQhio",
    "apnXkGMS",
    "xdPzxCtx",
    "A6Qyt64g",
    "lkml3f2P",
    "At13vSfK",
    "0uSbCev9",
    "jmmDppJK",
    "dDNh3ASx",
    "bipEDX9w",
    "73a8LRbI",
    "pGRBQNdu",
    "dKl73q7h",
    "2UbQLUml",
    "t4F0E5T3",
    "fx3G66OI",
    "4p1SIPmN",
    "h2Tgbdbj",
    "34hkr8Fm",
    "hfhTUeEk",
    "q7yl6gG1",
    "MFtNNG0E",
    "ANWYRQa7",
    "FU1xvJ0F",
    "X4g3xAie",
    "O0Zwr81j",
    "gb5t4pnB",
    "WdJ3iAcj",
    "7F6RQLRQ",
    "2ZlBoSZQ",
    "MlB53HdZ",
    "GZzf6KcK",
    "Cl5bLniy",
  ],
  final: ["E33TELm8"],
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
    if (!e.includes("27")) continue;

    const roundN = pgn.headers.get("Round").split(".")[0];

    let roundLeague;

    let aN = parseInt(roundN) - 1;

    if (e.includes("league a")) roundLeague = Rounds.leagueA[aN];
    else if (e.includes("league b")) roundLeague = Rounds.leagueB[aN];
    else if (e.includes("league c")) roundLeague = Rounds.leagueC[aN];
    else if (e.includes("league d")) roundLeague = Rounds.leagueD[aN];
    else if (e.includes("semileague 1")) roundLeague = Rounds.semileague1[aN];
    else if (e.includes("semileague 2")) roundLeague = Rounds.semileague2[aN];
    else if (e.includes("final league")) roundLeague = Rounds.finalLeague[aN];
    else if (e.includes("final")) {
      if (aN < 100) roundLeague = Rounds.final[0];
      //else roundLeague = Rounds.final[1];
    }

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
