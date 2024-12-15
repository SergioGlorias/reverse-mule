import { parsePgn, makePgn, ChildNode, Node } from "chessops/pgn";
import process from "node:process";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
dayjs.extend(duration);

const litoken = process.env.LICHESS_TOKEN;

const Rounds = {
  entrance: [
    "j3aN8T1a", //1
    "GoqPkQ7g", //2
    "WVjYuWyH", //3
    "QSiROWSO", //4
    "3yCZqx2S", //5
    "7WW7jqwR", //6
    "oZvcttCX", //7
    "QYwdGXIR", //8
    "R4WnAo5d", //9
    "Y0Giy1Ef", //10
    "qOu4cnpV", //11
    "UQcdC1rD", //12
    "0tQJxXbA", //13
    "JmTTemVd", //14
    "HgdAZZOp", //15
    "qQfM7J9v", //16
    "DH00qr5s", //17
    "tgDTtj21", //18
    "WePbpgk4", //19
    "csoMDXd2", //20
    "vtKKSKdr", //21
    "7FXRdyAu", //22
    "6vxwHSAh", //23
    "owyVwmup", //24
    "FP3OIWqO", //25
    "TcMv0rnn", //26
    "uoUM4hmm", //27
    "WUopkM8y", //28
    "466WGqHe", //29
    "RjvZPGgv", //30
  ],
  league2: [
    "1fbaEgkt", //1
    "idigezWZ", //2
    "eVjtIx7w", //3
    "FH513LPv", //4
    "P0v9TE3i", //5
    "d6QY2Wz9", //6
    "pBt0GJK5", //7
    "x0gpMsGr", //8
    "8UU3bIhP", //9
    "3W9SkTSr", //10
    "061adhT4", //11
    "RloS9d26", //12
    "qyCzahTM", //13
    "G0UrGjhY", //14
    "l9vTjSXr", //15
    "w4PlS3uL", //16
    "bj9yCiAY", //17
    "okkj2bWq", //18
    "vtfWZDbf", //19
    "ElhILGCm", //20
    "FFjSAVKt", //21
    "z80vHDy3", //22
    "iP3uxudd", //23
    "RSyxd4DW", //24
    "cb5CCcZk", //25
    "zGrxqzEM", //26
    "HWYnw3HT", //27
    "mc5FR5pA", //28
    "Rvdw7PIb", //29
    "SwY23RVg", //30
    "oKuNiSh5", //31
    "Xz8w45rL", //32
    "ptvSbQa1", //33
    "wvaXzmee", //34
    "B0BAJuWI", //35
    "LOcZTKZ2", //36
    "k4RiUF92", //37
    "mwSLVAud", //38
    "z6KESf7c", //39
    "omTJBTzg", //40
    "7MpbAZwx", //41
    "k1gKvXWV", //42
    "Wm4sbk8h", //43
    "Ib8auXab", //44
  ],
  league1: [
    "C9E2xgLU", //1
    "Io78Mlf1", //2
    "knckurZK", //3
    "PUAQSOzu", //4
    "s4PS6Zqj", //5
    "7vO1gJHk", //6
    "jQFBHJcN", //7
    "CbwThmlR", //8
    "JjbQxA3A", //9
    "Ah1sFc3O", //10
    "fiFdTaaL", //11
    "SKuwJ0pZ", //12
    "dG1AjHjE", //13
    "y5BxHGQ7", //14
    "bNY4fcgd", //15
    "1yWtJMHr", //16
    "OGNBrcFY", //17
    "fqZl7bDi", //18
    "mLOpjnsi", //19
    "of0r7QfY", //20
    "xlqx5GvV", //21
    "DLja8T5n", //22
    "0hqpgnL1", //23
    "o2bCh9MC", //24
    "XiTNvcCP", //25
    "ZDKdr24D", //26
    "vg7aX7WW", //27
    "oXU7Oq5x", //28
    "itl5VAmw", //29
    "xl2r6k4m", //30
    "wk3HriEL", //31
    "4cz1LRXn", //32
    "4IjNFB5y", //33
    "l4jhdUVH", //34
    "M889tv1K", //35
    "gacsdYzT", //36
    "PmPblQ2h", //37
    "AWz6c4Aj", //38
    "i9L8MOBQ", //39
    "lwm9AHAG", //40
    "IVmx7UB3", //41
    "WoWavcTI", //42
    "RuTXQWf1", //43
    "yrdCT4B6", //44
  ],
  divisionP: [
    "PKgKryzJ", //1
    "gNnNyRU1", //2
    "j7EMWMgz", //3
    "aATvFoMn", //4
    "BGxSGF0g", //5
    "Es060O5S", //6
    "suOp2PNJ", //7
    "He6kCJu9", //8
    "XxZamCQq", //9
    "hQLhsxCC", //10
    "zKSWe4zk", //11
    "iPMNde5G", //12
    "pIzJaZV2", //13
    "dIHJxWGT", //14
    "lrLll3ri", //15
    "9fUf4UOR", //16
    "p7surcpq", //17
    "nJJozSlO", //18
    "azKlB6W7", //19
    "PPc1Ndjo", //20
    "ZbL5TiEL", //21
    "H8RtBiFV", //22
    "CLYQy5BQ", //23
    "UctEAHmJ", //24
    "3mf9t2AH", //25
    "lfIuTKRg", //26
    "uO8SPcBB", //27
    "qtvB35NC", //28
    "LKoIcHmJ", //29
    "ZrJDnP0d", //30
    "Kq9LxF7x", //31
    "GaUtr2Ja", //32
    "rT9jq7Fw", //33
    "YJN8AHKz", //34
    "9MexKzSh", //35
    "Ykmn3JAN", //36
    "QrCMF9hb", //37
    "EsudRr8f", //38
    "QlVbmve9", //39
    "eo66DuYS", //40
    "IYvXVkID", //41
    "W6gZAMSb", //42
    "vZS64DH5", //43
    "JmR7739J", //44
    "w8nu3Gfc", //45
    "3oUcs74I", //46
    "jK0Dervq", //47
    "zauXwY9Y", //48
    "Cd5YXTRz", //49
    "MU1Ot7hT", //50
    "qkM0PBtC", //51
    "Ti4xTNeH", //52
    "m1z3Mu77", //53
    "XxadBnEe", //54
    "9WjlC7Es", //55
    "rLGwxSl3", //56
  ],
  superfinal: [
    "MtK1cFb4", // 1
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
  return fetch(`https://lichess.org/api/broadcast/round/${id}/push`, {
    body: pgn,
    method: "POST",
    headers: {
      Authorization: "Bearer " + litoken,
      "User-Agent": "Reverse Mule by SergioGlorias/reverse-mule",
    },
  })
    .then((res) => {
      console.log(res.status)
      return res.json()
    })
    .catch((res) => {
      console.error(res)
      return null
    });
};

const run = async () => {
  console.log("=== FETCH ===");
  const pgn = await fetchTCECpgn();
  if (!pgn) return;

  const event = pgn.headers.get("Event");

  console.log(`Event: ${event}`);

  let e = event.toLowerCase();
  if (e.includes("testing")) return;
  if (!e.includes("27")) return;

  const roundN = pgn.headers.get("Round").split(".")[0];

  let roundLeague;

  let aN = parseInt(roundN) - 1;

  if (e.includes("entrance")) roundLeague = Rounds.entrance[aN];
  else if (e.includes("league 2")) roundLeague = Rounds.league2[aN];
  else if (e.includes("league 1")) roundLeague = Rounds.league1[aN];
  else if (e.includes("division")) roundLeague = Rounds.divisionP[aN];
  else if (e.includes("superfinal")) {
    roundLeague = Rounds.superfinal[1];
  }

  if (roundLeague == undefined) return;

  const white = pgn.headers.get("White");
  const black = pgn.headers.get("Black");
  const tc = pgn.headers.get("TimeControl");

  console.log(`Match: ${white} - ${black}`);

  const terminationDetails = pgn.headers.get("TerminationDetails");
  const termination = pgn.headers.get("Termination");


  if (terminationDetails) {
    if (termination) pgn.headers.set("Termination", `${termination} - ${terminationDetails}`)
    else pgn.headers.set("Termination", terminationDetails)
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
};

console.log("===== CODE STARTED =====");
setInterval(() => run(), 5 * 1000);
