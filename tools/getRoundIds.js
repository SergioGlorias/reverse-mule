const id = "0rqG3Snr"

fetch(`https://lichess.org/api/broadcast/${id}`)
    .then(res => res.json())
    .then(json => json.rounds.map(r => r.id))
    .then(a => console.info(a))    