import { parsePgn, makePgn } from "chessops/pgn";

const broadcasts = [
  {
    iccfurl: "https://www.iccf.com/GetEventPGN.aspx?id=109591",
    roundsIds: ["R6bBTJ68"],
  },
  {
    iccfurl: "https://www.iccf.com/GetEventPGN.aspx?id=107370",
    roundsIds: ["uNjJ5t42", "VZaitE5N"],
  },
  {
    iccfurl: "https://www.iccf.com/GetEventPGN.aspx?id=109825",
    roundsIds: ["k8hhD94x", "mDCDqZnL"],
  },
  {
    iccfurl: "https://www.iccf.com/GetEventPGN.aspx?id=110214",
    roundsIds: ["Qf46H9Pz", "PvEverEc"],
  },
  {
    iccfurl: "https://www.iccf.com/GetEventPGN.aspx?id=111366",
    roundsIds: ["O3jrmBbK", "DRBVxRdr"],
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const litoken = process.env.LICHESS_TOKEN;

const getPGN = async (iccfurl) => {
  try {
    const res = await fetch(iccfurl, {
      headers: { "User-Agent": "github.com/SergioGlorias/reverse-mule" },
    });
    if (!res.ok) return null;
    const text = await res.text();
    if (!text.trim()) return null;
    return parsePgn(text);
  } catch {
    return null;
  }
};

const divideGamesByRounds = (games, roundsCount) =>
  games.reduce(
    (groups, game, i) => {
      groups[i % roundsCount].push(game);
      return groups;
    },
    Array.from({ length: roundsCount }, () => [])
  );

const pushPGN = async (pgn, id) => {
  try {
    const res = await fetch(
      `https://lichess.org/api/broadcast/round/${id}/push`,
      {
        method: "POST",
        body: pgn,
        headers: {
          Authorization: `Bearer ${litoken}`,
          "User-Agent": "Reverse Mule by SergioGlorias/reverse-mule",
        },
      }
    );
    return await res.text();
  } catch {
    return null;
  }
};

const run = async () => {
  if (!litoken) {
    console.error("LICHESS_TOKEN não definido!");
    process.exit(1);
  }
  for (const { iccfurl, roundsIds } of broadcasts) {
    if (!iccfurl || !roundsIds?.length) {
      console.error("URL ou IDs de rodadas inválidos!");
      continue;
    }
    console.info(
      `Processando: ${iccfurl} com rodadas: ${roundsIds.join(", ")}`
    );
    const games = await getPGN(iccfurl);
    if (!games) {
      console.error("Sem jogos encontrados ou erro ao obter PGN!");
      continue;
    }
    const groupedGames = divideGamesByRounds(games, roundsIds.length);
    for (let i = 0; i < roundsIds.length; i++) {
      const gamesPGN = groupedGames[i]
        .map((game) => {
          game.headers.set("WhiteFideId", "0");
          game.headers.set("BlackFideId", "0");
          return makePgn(game);
        })
        .join("\n\n");
      const res = await pushPGN(gamesPGN, roundsIds[i]);
      console[res ? "info" : "error"](res || "Fail Push");
      await delay(1000);
    }
  }
};
run();
setInterval(run, 15 * 60 * 1000);
