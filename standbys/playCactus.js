const caller = require("../commands/cactus.js");

function drawCards (num, pile, hand) {
  for (num; num > 0; num--) {
    if (pile.length == 0) {
      return; 
    }
    hand.push(pile.shift()); 
  }
}

exports.run = async (client, message, ...args) => {
  
  let turnNum = 0;
  let deck = [];
  let senderHand = [];
  let opponentHand = [];
  let senderField = [{},{},{},{},{}];
  let opponentField = [{},{},{},{},{}];
  
  function gameLoop(sender, opponent, room) {
  
    if (turnNum === 0) {
      deck.push(
      {stars: 1, ability: "mult", magnitude: 4},
      {stars: 1, ability: "swap", magnitude: 4},
      {stars: 1, ability: "draw", magnitude: 4},
      {stars: 1, ability: "boom", magnitude: 4},  
      {stars: 2, ability: "mult", magnitude: 3},
      {stars: 2, ability: "swap", magnitude: 3},
      {stars: 2, ability: "draw", magnitude: 3},
      {stars: 2, ability: "boom", magnitude: 3},
      {stars: 2, ability: "none", magnitude: 0},  
      {stars: 3, ability: "mult", magnitude: 2},
      {stars: 3, ability: "swap", magnitude: 2},
      {stars: 3, ability: "draw", magnitude: 2},
      {stars: 3, ability: "boom", magnitude: 2},
      {stars: 3, ability: "none", magnitude: 0},  
      {stars: 4, ability: "mult", magnitude: 1},
      {stars: 4, ability: "swap", magnitude: 1},
      {stars: 4, ability: "draw", magnitude: 1},
      {stars: 4, ability: "boom", magnitude: 1},
      {stars: 4, ability: "none", magnitude: 0},  
      {stars: 5, ability: "none", magnitude: 0}        
      );
      
      let swapIdx = 0;
      let swapHold = 0;
      
      for (let d = deck.length; d > 0; d--) {
        swapIdx = Math.floor(Math.random() * d);
        swapHold = deck[d];
        deck[d] = deck[swapIdx];
        deck[swapIdx] = d;
      }
      
      for (let t = 0; deck.length > 0; t++) {
        console.log("Stars: " +  deck[t].stars + " Effect: " + deck[t].effect);
      }
      
      /*if (Math.floor(Math.random() * 2) == 0) {
        drawCards(5, deck, senderHand);
        drawCards(5, deck, opponentHand);
      }
      else {
        drawCards(5, deck, opponentHand);
        drawCards(5, deck, senderHand);
      }*/
    }
  
    //gameLoop(sender, opponent, room);
  }
}



