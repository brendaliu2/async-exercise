'use strict';

const BASE_URL = 'http://deckofcardsapi.com/api/deck/';

let deck_id;

async function getNewDeck() {
  const resp = await axios.get(`${BASE_URL}new/shuffle/?deck_count=1`);

  deck_id = resp.data.deck_id;
}

async function getOneCard(deck_id) {
  const resp = await axios.get(`${BASE_URL}${deck_id}/draw/?count=1`);

  console.log(resp.data.cards[0].suit, resp.data.cards[0].value);
  return resp.data.cards[0].image;
}

async function handleClick() {
  const card = await getOneCard(deck_id);
  const $img = $(`<img src="${card}">`)

  $('#cards-area').append($img);
}

getNewDeck();
$('button').on("click", handleClick)