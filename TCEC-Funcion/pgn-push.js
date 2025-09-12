import process from "node:process";
const litoken = process.env.LICHESS_TOKEN;

export const LichessPushPGN = (pgn, id) => {
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
