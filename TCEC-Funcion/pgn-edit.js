import { makePgn, ChildNode, Node } from "chessops/pgn";

export const pgnEdit = (pgn) => {
  const white = pgn.headers.get("White"),
    black = pgn.headers.get("Black"),
    tc = pgn.headers.get("TimeControl"),
    terminationDetails = pgn.headers.get("TerminationDetails"),
    termination = pgn.headers.get("Termination");

  console.log(`Match: ${white} - ${black}`);

  if (terminationDetails) {
    if (termination)
      pgn.headers.set("Termination", `${termination} - ${terminationDetails}`);
    else pgn.headers.set("Termination", terminationDetails);
  }

  pgn.headers.delete("TerminationDetails");
  pgn.headers.delete("PlyCount");
  pgn.headers.delete("GameDuration");
  pgn.headers.delete("GameEndTime");
  pgn.headers.delete("GameStartTime");
  pgn.headers.delete("Opening");
  pgn.headers.delete("ECO");
  pgn.headers.delete("Variation");

  const moves = [];

  const tcBase = tc ? Number(tc.split("+")[0]) : null;

  for (const m of pgn.moves.mainline()) {
    let clk;
    if (m.comments?.[0]?.includes("book,") && tcBase) clk = tcBase * 1000;
    else {
      const tlMatch = m.comments?.[0]?.match(/tl=(\d+)/)?.[1];
      if (tlMatch) clk = Number(tlMatch);
    }
    m.comments = clk ? [`tl=${clk}`] : [];
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

  return makePgn(pgg);
};
