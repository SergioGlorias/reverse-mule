import { parsePgn, makePgn } from "chessops/pgn";

const iccfurl = "https://www.iccf.com/GetEventPGN.aspx?id=107370";

const roundsIds = ["uNjJ5t42", "VZaitE5N"];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const litoken = process.env.LICHESS_TOKEN;

const getPGN = () =>
  fetch(iccfurl, {
    headers: {
      "User-Agent": "github.com/SergioGlorias/reverse-mule",
    },
  })
    .then((res) => (res.status === 200 ? res.text() : ""))
    .then((text) => parsePgn(text))
    .catch(() => null);

const divideGamesByRounds = (games, roundsCount) => {
  const groups = Array.from({ length: roundsCount }, () => []);
  games.forEach((game, index) => {
    groups[index % roundsCount].push(game);
  });
  return groups;
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
  const games = await getPGN();
  if (!games) return;

  const roundsCount = roundsIds.length;
  if (roundsCount === 0) return;
  const groupedGames = divideGamesByRounds(games, roundsCount);

  for (let i = 0; i < roundsCount; i++) {
    const roundGames = groupedGames[i];
    const roundId = roundsIds[i];

    const gamesPGN = roundGames.map(game => makePgn(game)).join("\n\n");

    const r = await pushPGN(gamesPGN, roundId);

    if (r) console.info(r);
    else console.error("Fail Push");

    await delay(1000);
  }
};
run();
// 5 minutes
setInterval(()=> run(), 5 * 60 * 1000);
