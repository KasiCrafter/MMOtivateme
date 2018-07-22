const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('ccUserData');

exports.run = (client, message, args) => {
  
  let sender = message.author;
  let target = "";
  
  if (message.mentions.users.size > 0) {
    target = message.mentions.users.first();
    
    if (target.bot) {
      message.reply(`User ${target} is a Bot, and therefore cannot have a profile.`); 
      return;
    }
  }
  else  {
   target = sender; 
  }
  
  
  db.serialize( () => {
    
    db.run("CREATE TABLE IF NOT EXISTS ccData (userId TEXT, money INT, cardback TEXT, stats TEXT, streak TEXT, inventory TEXT)");

    db.get(`SELECT * FROM ccData WHERE userId = ${target.id}`, function(err, row) {
      if (!row) {
        if (err) {console.error(err); }
        
        if (sender.id === target.id) {
          db.run("INSERT INTO ccData (userId, money, cardback, stats, streak, inventory) VALUES (?, ?, ?, ?, ?, ?)", [sender.id, 0, "🌵", /*Wins/Loses/Total -->*/ "0,0,0", /*Streak, Highest streak -->*/ "0,0", "Empty!"]);
          message.reply("Profile created!");
        }
        else {
          message.reply("User hasn't created a profile yet!");
          return;
        }        
      }
      
        db.get(`SELECT * FROM ccData WHERE userId = ${target.id}`, function (err, row) {
          
          let rawBacks = row.cardback.split(",");
          let rawStats = row.stats.split(",");
          let rawStreak = row.streak.split(",");
          let rawInv = row.inventory.split(",");
          let invOut = "";
          
          for (let v = 0; v < rawInv.length; v++) {
             invOut += `${1 + v}.) **${rawInv[v]}**\n`;
          }

          message.channel.send(`User **${target.username}** currently has:\n\n*__Money__*:\n**${row.money}**\n\n*__Card backs__*:\n${rawBacks[0]}\n${(rawBacks[1] || rawBacks[0])}\n\n*__Stats__*:\n**${rawStats[0]}** Wins, **${rawStats[1]}** Losses, **${rawStats[2]}** Games Played\n\n*__Win Streak__*:\n**${rawStreak[0]}**, (Highest: **${rawStreak[1]}**)\n\n*__Inventory__*:\n${invOut}`);
        });
    });
  });
}

