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
    
    //const colNames = \S+(?=:)
    //const emojiReg = /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/g
    //const idReg = /\d{18}/
    //const moneyReg = /\d+(?=,)/
    //const statsReg = /\d+\/\d+\/\d+/
    //const streakReg = \d+\|\d+
    //
    //

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

