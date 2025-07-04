import { parsePgn, makePgn, ChildNode, Node } from "chessops/pgn";
import process from "node:process";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
dayjs.extend(duration);

const litoken = process.env.LICHESS_TOKEN;

const Rounds = {
  entrance: [
    "ITw9s9bN", // Round 1
    "kdH4Obz4", // Round 2
    "YuH7idV5", // Round 3
    "vKPKVxbQ", // Round 4
    "mkJktF5b", // Round 5
    "qPofJ4sJ", // Round 6
    "hwZV91jQ", // Round 7
    "PGiXcCN9", // Round 8
    "utSeijn6", // Round 9
    "WaBMUgFR", // Round 10
    "MAPTYz9t", // Round 11
    "bDN30Aih", // Round 12
    "zVMLhEj1", // Round 13
    "VAqo5gJI", // Round 14
    "QXf3ZuQq", // Round 15
    "gbD70y5P", // Round 16
    "sV1yyboC", // Round 17
    "7PjcdZFr", // Round 18
    "fxHpZlGY", // Round 19
    "MtBQgPXZ", // Round 20
    "kKgf7pf7", // Round 21
    "dXI6hgO4", // Round 22
    "QYLjN9Hj", // Round 23
    "BZlL92ik", // Round 24
    "ZLbfq3v3", // Round 25
    "pCGT2exW", // Round 26
    "hw0bkDE2", // Round 27
    "iBofjzwi", // Round 28
    "CgZEBB7O", // Round 29
    "i0uXPN7j", // Round 30
    "CYybOotx", // tiebreak
  ],
  league2: [
    "aN38KYzh", // Round 1
    "Sv9G3kVF", // Round 2
    "FvNWUsH0", // Round 3
    "zolX3wUy", // Round 4
    "hxqxs2N3", // Round 5
    "DECiwHvz", // Round 6
    "oKZXBeOY", // Round 7
    "gC87lsh2", // Round 8
    "HRrY5hr3", // Round 9
    "DLebiG9d", // Round 10
    "M3nqgfCD", // Round 11
    "Gtj2TkML", // Round 12
    "bfZ92Fdf", // Round 13
    "Kay0e4uN", // Round 14
    "WFqv7rrs", // Round 15
    "KTCD5X12", // Round 16
    "4vKTTr5t", // Round 17
    "vKKKkOnq", // Round 18
    "jykHBvzm", // Round 19
    "v8KBOOiF", // Round 20
    "2kvVxv3H", // Round 21
    "rKgVhFoz", // Round 22
    "z3SVKFtz", // Round 23
    "OZ4n0vRx", // Round 24
    "y3g2qVdV", // Round 25
    "xUbrvSr4", // Round 26
    "xHLm2gpm", // Round 27
    "7yvYKCMZ", // Round 28
    "GmNvkkW0", // Round 29
    "c1c9agPc", // Round 30
    "XH390i3u", // Round 31
    "P2XZmPdT", // Round 32
    "5NE1F91m", // Round 33
    "VxEBcDNw", // Round 34
    "Canu00xm", // Round 35
    "VBK0CE3U", // Round 36
    "LTId4hc2", // Round 37
    "0qzHec9w", // Round 38
    "Jq7qQuSt", // Round 39
    "3vLgjkGh", // Round 40
    "cO4ACMcp", // Round 41
    "DbckiN4L", // Round 42
    "oCd0BMvo", // Round 43
    "90DT363c", // Round 44
  ],
  league1: [
    "bRozR97N", // Round 1
    "gTiY7jQj", // Round 2
    "5KItbzQi", // Round 3
    "0PqKfdRz", // Round 4
    "l36CuL3v", // Round 5
    "c3IiHbtN", // Round 6
    "IQ78Itw0", // Round 7
    "Ivyq0XVq", // Round 8
    "5PVfzWFA", // Round 9
    "ybBGLhDD", // Round 10
    "qYb1VKqV", // Round 11
    "pWxjSIVN", // Round 12
    "EAo1BnY0", // Round 13
    "BlyRZnGm", // Round 14
    "2mdi3Qjb", // Round 15
    "vIoFwi4k", // Round 16
    "TvrCOGmK", // Round 17
    "NdYakQqj", // Round 18
    "8aaVgynT", // Round 19
    "61B2gGQW", // Round 20
    "MTDIUqaC", // Round 21
    "4CPdYNOe", // Round 22
    "G9htnITx", // Round 23
    "mgBMRsLo", // Round 24
    "yHdxP7c1", // Round 25
    "1HJDSRcE", // Round 26
    "3Hqx5rJw", // Round 27
    "B3NRTk1y", // Round 28
    "J86WgQr4", // Round 29
    "HM7yw8Wn", // Round 30
    "2aEFFwC0", // Round 31
    "NJF3juWT", // Round 32
    "OFk7MbiK", // Round 33
    "7R4RWHjP", // Round 34
    "mtlZUI1V", // Round 35
    "rmcKqHb9", // Round 36
    "Jtj2WeLg", // Round 37
    "zopMPDcg", // Round 38
    "SEu3GvUS", // Round 39
    "yXNGebiG", // Round 40
    "f3RPw424", // Round 41
    "aXJkrAhI", // Round 42
    "iCGXJpFP", // Round 43
    "zSOvEru9", // Round 44
  ],
  divisionP: [
    "zhJuZwNm", // Round 1
    "vevDXIHc", // Round 2
    "tJjnNG0x", // Round 3
    "3d8GwN4J", // Round 4
    "FNSAZOfn", // Round 5
    "dWVvjjZ9", // Round 6
    "0PumS6T3", // Round 7
    "MojbUtiN", // Round 8
    "YsPp8Sdv", // Round 9
    "5SmPJdQh", // Round 10
    "XkC6QqJt", // Round 11
    "mWP7zz5V", // Round 12
    "O1Sb2MxU", // Round 13
    "nBkpOa7v", // Round 14
    "zg8buFsC", // Round 15
    "k5eQ2DwF", // Round 16
    "R9FhlZ7b", // Round 17
    "gyJL6ySC", // Round 18
    "KEd6xWYV", // Round 19
    "lYq5bOWp", // Round 20
    "kyaxaxhX", // Round 21
    "P5bMiPwY", // Round 22
    "Mpm8gMjR", // Round 23
    "C25GJKtK", // Round 24
    "97wZBZaf", // Round 25
    "a0S6FYkT", // Round 26
    "hQqMADTJ", // Round 27
    "dK4L8BEo", // Round 28
    "VNkMymKq", // Round 29
    "AhoZK2fJ", // Round 30
    "VzQ82TRf", // Round 31
    "DlHd6M3H", // Round 32
    "FqLDpgpL", // Round 33
    "TQSRzPrn", // Round 34
    "DesDtSMp", // Round 35
    "sIHO0HXL", // Round 36
    "a949uKGq", // Round 37
    "k8JfgrKt", // Round 38
    "ypeZuyT1", // Round 39
    "qG35TnoJ", // Round 40
    "bhRjJRbP", // Round 41
    "2QWU57pZ", // Round 42
    "Mnpzhber", // Round 43
    "dESI8j02", // Round 44
    "OUGH4yeK", // Round 45
    "BARI2d3q", // Round 46
    "QOMQN8Kf", // Round 47
    "CvgnE3Jl", // Round 48
    "qbtGTtx6", // Round 49
    "g7IURPsE", // Round 50
    "uqdJgGZ7", // Round 51
    "H8i4gCrk", // Round 52
    "p0li1LuY", // Round 53
    "0jF8Udia", // Round 54
    "HpWDa7g6", // Round 55
    "NyU1tWJ5", // Round 56
  ],
  superfinal: [
    "KeswEzV5", // Round 1
  ],
  // bonus: ["Gw2pKKhE"],
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

const pushPGN = (pgn, id) =>
  fetch(`https://lichess.org/api/broadcast/round/${id}/push`, {
    method: "POST",
    body: pgn,
    headers: {
      Authorization: `Bearer ${litoken}`,
      "User-Agent": "Reverse Mule by SergioGlorias/reverse-mule",
    },
  })
    .then((res) => (console.log(res.status), res.json()))
    .catch((err) => (console.error(err), null));

const run = async () => {
  console.log("=== FETCH ===");
  const pgn = await fetchTCECpgn();
  if (!pgn) return;

  const event = pgn.headers.get("Event");

  console.log(`Event: ${event}`);

  let e = event.toLowerCase();
  if (e.includes("testing")) return;
  if (!e.includes("28")) return;

  const roundN = pgn.headers.get("Round").split(".")[0];

  let roundLeague;

  let aN = parseInt(roundN) - 1;

  if (e.includes("entrance")) {
    if (e.includes("tiebreak") roundLeague = Rounds.entrance[30]
    else roundLeague = Rounds.entrance[aN]
  };
  else if (e.includes("league 2")) roundLeague = Rounds.league2[aN];
  else if (e.includes("league 1")) roundLeague = Rounds.league1[aN];
  else if (e.includes("division")) roundLeague = Rounds.divisionP[aN];
  else if (e.includes("superfinal")) {
    if (aN < 100) roundLeague = Rounds.superfinal[0];
    //else roundLeague = Rounds.superfinal[1];
  }

  if (roundLeague == undefined) return;

  const white = pgn.headers.get("White"),
    black = pgn.headers.get("Black"),
    tc = pgn.headers.get("TimeControl");

  console.log(`Match: ${white} - ${black}`);

  const terminationDetails = pgn.headers.get("TerminationDetails"),
    termination = pgn.headers.get("Termination");

  if (terminationDetails) {
    pgn.headers.set(
      "Termination",
      termination
        ? `${termination} - ${terminationDetails}`
        : terminationDetails
    );
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

  console.log(pgnText);

  const r = await pushPGN(pgnText, roundLeague);

  if (r) console.info(r);
  else console.error("Fail Push");

  console.log("=========");
};

console.log("===== CODE STARTED =====");
setInterval(() => run(), 5 * 1000);
