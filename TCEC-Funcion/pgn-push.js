import process from "node:process";
const litoken = process.env.LICHESS_TOKEN;

let lastPGN = "";

export const LichessPushPGN = (pgn, id) => {
  if (pgn === lastPGN) return Promise.resolve({ status: "same" });
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
      if (res.status === 200) lastPGN = pgn;
      return res.json();
    })
    .catch((res) => {
      console.error(res);
      return null;
    });
};
