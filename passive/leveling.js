const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('levelMatrix');
                      

exports.run = (client, message) => {  
  
  db.serialize(function() {
    
    db.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INT, level INT)");  
    
    db.get(`SELECT * FROM scores WHERE userId = ${message.author.id}`, function(err, row) {
      if (!row) {
        db.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
        console.log("ROW CREATED");
      }
      
      else {
        let currLevel = row.points + 1;
        if (currLevel > row.level) {
          row.level = currLevel;
        }        

        db.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
        message.reply(`***__LEVEL UP!!__***  You are now level ***${row.level}***!`);
      }      
      
    });

    console.log("AFTER everything");
    
  });
}
              
                     