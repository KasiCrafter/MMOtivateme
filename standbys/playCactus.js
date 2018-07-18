const caller = require("../commands/cactus.js");

exports.run = async (client, message, args) => {
  let sender = args[0];
  let opponent = args[1];
  let room = args[2];
  
  console.log(sender);
  console.log(opponent);
  console.log(room);
  
  let turnNum = 0;
  let deck = [];
  let senderHand = [];
  let opponentHand = [];
  let senderField = [{},{},{},{},{}];
  let opponentField = [{},{},{},{},{}];
  
  
  gameLoop(sender, opponent, room);
  
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
      

     /* for (let t = 0; t < deck.length; t++) {
        console.log("Stars: " + deck[t].stars + " Ability: " + deck[t].ability);
      }*/
      
      
      let swapIdx = 0;
      let swapHold = 0;
      let length = deck.length - 1;
      
      
      for (let d = length; d > 0; d--) {
        swapIdx = Math.floor(Math.random() * length);
        swapHold = deck[d];
        deck[d] = deck[swapIdx];
        deck[swapIdx] = swapHold;
      }
      
     /* for (let t = 0; t < deck.length; t++) {
        console.log((t + 1) + ") Stars: " + deck[t].stars + " Ability: " + deck[t].ability);
      }*/

      console.log(deck.length);
      
      if (Math.floor(Math.random() * 2) == 0) {
        drawCards(5, deck, senderHand);
        drawCards(5, deck, opponentHand);
      }
      else {
        drawCards(5, deck, opponentHand);
        drawCards(5, deck, senderHand);
      }
      
      /*console.log("Sender: " + senderHand.length);
      console.log("Enemy: " + opponentHand.length);
      
      for (let s = 0; s < senderHand.length; s++) {
        console.log(s + " sender) " + senderHand[s].stars + ", " + senderHand[s].ability);
      }

       for (let o = 0; o < opponentHand.length; o++) {
        console.log(o + " oppo) " + opponentHand[o].stars + ", " + opponentHand[o].ability);
      }*/
      turnNum++;
      
      console.log("PASSED DRAW");
    }
  
    /*else*/ if (turnNum >= 6) {

    }
    else {
      room.send("test");
    }
    //gameLoop(sender, opponent, room);
  }
}


function drawCards (num, pile, hand) {
  
  this.num = num;
  this.pile = pile;
  this.hand = hand;  
  
  for (num; num > 0; num--) {
    if (pile.length == 0) {
      return; 
    }
    hand.push(pile.shift()); 
    //console.log(num + ") " + hand[5 - num].stars + ", " + hand[5 - num].ability);
  }
}
