const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('ccUserData');

exports.run = (client, message, args) => {
  
  let sender = message.author;
  let target = "";
  
  if (message.mentions.users.size > 0) {
    target = message.mentions.users.first();
  }
  else {
   target = sender; 
  }
  
  
  db.serialize( () => {
    
    db.run("CREATE TABLE IF NOT EXISTS ccData (userId TEXT, money INT, cardbacks TEXT, stats TEXT, inventory TEXT)");

    db.get(`SELECT * FROM ccData WHERE userId = ${target.id}`, function(err, row) {
      if (!row) {
        console.error(err); 
        
        if (sender.id === target.id) {
          db.run("INSERT INTO ccData (userId, money, cardBacks, stats, inventory) VALUES (?, ?, ?, ?, ?)", [sender.id, 0, "🌵", "0 Wins,0 Losses,0 Played", "Empty!"]);
          message.reply("Profile created!");
        }
        else {
          message.reply("User hasn't created a profile yet!");
          return;
        }        
      }
      

        db.get(`SELECT * FROM ccData WHERE userId = ${target.id}`, function (err, row) {            

          
          
        });
    });
  });
}