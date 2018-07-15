//const sql = require("sqlite3").verbose();
//const testData = new sql.Database("testHold");

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('abcd2');
                      

exports.run = (client, message) => {  
  
  console.log("STARTING POINTS");
  
  db.serialize(function() {
    //db.run("EXIST(SELECT * FROM test1) BEGIN CREATE TABLE test1 (id INT, dt TEXT) END");
    
      console.log("Trying table..");
    
    db.run("CREATE TABLE IF NOT EXISTS boops1 (id INT, dt TEXT)");     
    
    console.log("NANI");


    
    var stmt = db.prepare("INSERT INTO boops1 VALUES (?, ?)");
    
    console.log("AFTER statement");
   for (var i = 0; i < 10; i++) {
      var d = new Date();
      var n = d.toLocaleTimeString();
      stmt.run(i, n)
      
      console.log("DURING statement");
    }
    stmt.finalize();
    
    console.log("AFTER prepare");
    
    db.each("SELECT id, dt FROM boops1", function(err, row) {
      console.log("User id: " + row.id, row.dt);  
    });
    
    console.log("AFTER everything");
    
  });
  
  /*testData.serialize( function() {
    testData.run("IF NOT EXISTS (SELECT * FROM scores) BEGIN END ELSE BEGIN CREATE TABLE scores (userId TEXT, points INTEGER, level INTEGER) END");
                 
    testData.run("SELECT * FROM scores WHERE user =" + message.author.id);  function (err, row){
      if (!row) {
        testData.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
      }
      else {
        let currLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
        if (currLevel > row.level) {
          row.level = currLevel;

          testData.run(`"UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
          message.reply(`***__LEVEL UP!__*** You are now level ${currLevel}`);
        }
        else {
          testData.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = message.author.id`);
        }
      }      
    })/*.catch( () => {
      console.error;

      testData.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER")
      .then( () => {sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 0, 1])})        
    });*/
    
    //testData.finalize();
//  });
  
  //testData.reset();
}
              
                     