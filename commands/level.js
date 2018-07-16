const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("levelMatrix");
const config = require("../config.json");

exports.run = (client, message) => {
  if (config.doExp == true) {
    
    console.log(config.doExp);
    db.serialize(function() {
      
      db.get(`SELECT level FROM scores WHERE userId = ${message.author.id}`, function(err, row) {
        if(!row) {
          console.error(err);
          console.log("Table or row does not exist.");
          return;
        }          
        else {
          message.reply(`Your current level is: ${row.level}`);
        }
      });   
    });    
  }
  else {
   message.reply("Levels unavailable. Set config option 'doExp' to true to enable leveling!");
   return; 
  }
}