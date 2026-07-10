const Rounds = {
  hce: [
    'm4XsPuMg', 'FNnnPPGw', 'yJPVWKUk',
    '9CfoRFBU', 'fR7jdXqa', 'KhVhSJcg',
    '18xQhJZ5', 'IgZQTMzU', 'oGpKGWKn',
    'yyx1bChb', 'dABc341j', 'oO6isf1z',
    'GoIonEje', 'MgBCVnBo', 'QaR4jSO1',
    'UK6zH5T4', 'OXAURxZz', 'VTNJASXg',
    'MuJsUQjB', '4GUmr9Nb', 'nUrflGfE',
    'f8ipojhl', 'RiwN8jFQ', 'M6DcRiLn',
    'uv4tFVIs', 'SlKdwJjB', '7eSRN1P3',
    'XDWNEFpE', 'GmCK474g', 'blmAEjGn',
    'g79QcWqa', 'EqQTFnzG', 'pfQsWuIA',
    'fW4QnA0C', 'yBAym4oT', 'TRKvfVcD',
    'Xcr2AzlI', 'cePb44Nl', '9ip8Sjd9',
    '6Jgxg65H', 'b2ElnoRE', 'IZvMxlM6'
  ]
};

export const roundChesck = (roundId, eventName) => {
  const tcecSeason = "TCEC Season 30";
  let roundLeague;
  if (eventName.includes(tcecSeason.toLowerCase()) && eventName.includes("HCE".toLowerCase()))
    roundLeague = Rounds.hce[roundId];

  return roundLeague;
};
