const Rounds = {
  gpu: [
    'Venj6cA4', 'XuVvXdfp', 'uDX0vYgc',
    'RvtozXHi', '4aAdPFpx', 'diJte0sx',
    'pazY68Ff', 'hSK283T1', 'pQBBAgJB',
    'fmIRuQ4q', '2dxKnTQR', 'JGO0Y9Mo',
    'GgEICAzT', 'gpO5gkmM', 'z8LVuKbY',
    'hpLw4Q48', 'AQ68qgOv', 'ocK1O1Od',
    'CIv3kZnj', 'EROr6SL4', 'JYiRcJZ7',
    'yVYPf5bO', 'N6fqDrc7', 'SlRbeTOH',
    'F120w3Bl', '62U6RKnn', 'w5rZLEM8',
    'AiDJmH3d', 'laviwGpF', 'KiojS9PE',
    'o9kxSdKX', 'KHgnGPdA', 'DferTLFb',
    'vFg65hKi', 'Q401K5U8', 'LIACU4IX',
    '81t1c7GS', '92EK8Mhz', 'RXLYIRob',
    'I4v1vHfS'
  ]
};

export const roundChesck = (roundId, eventName) => {
  const tcecSeason = "TCEC Season 30";
  let roundLeague;
  if (eventName.includes(tcecSeason.toLowerCase()) && eventName.includes("GPU".toLowerCase()))
    roundLeague = Rounds.gpu[roundId];

  return roundLeague;
}; 
