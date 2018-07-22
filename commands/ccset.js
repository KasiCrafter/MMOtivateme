const sqlite3 = require('sqlite3').verbose();
const ccinfo = require("../commands/ccinfo.js");
const config = require("../config.json");
const db = new sqlite3.Database('ccUserData');


exports.run = (client, message, args) => {
  this.args = args;
  
  if (message.author.id !== config.ownerId) { message.reply("You are not nauthorized to change others' data."); return;}
  
  if (args.length < 2 || args.length % 2 !== 0) {
    message.reply("Not enough parameters, one or more **pairs** are required: the parameter to change, a space, and then the parameter to change it to."); 
    return;
  }
  
  console.log("WAN");
  
  let sender = message.author;
  let target = message.mentions.users.first() || sender;
  let output = `Successfully set **${target.username}**'s `;
  
  
  
  console.log("WAN WAN WAN");
  
  for (let test = 0; test < args.length; test += 2) {
    console.log("NANDA??" + test + "  " + args.length);    
    for (let com = 2; com < args.length; com += 2) {
      if (args[test] == args[com]) {
        message.reply(`Redundant parameters found: **${args[test]}** and **${args[com]}**. Aborting command.`);
        console.log("NANI???");
        return;
      }
      else {
        args[test].toString(); 
      }
    }
  }
  
  console.log("TOO!");
  
  db.serialize( () => {
    
    console.log("THREE");
    
    for(let set = 0; set < args.length; set += 2) {

      db.get(`SELECT ${args[set]} FROM ccData WHERE userId = ${target.id}`, function(err, row) {
        if (args[set] == "money" && (args[set + 1] % 1 !== 0)) {
          message.reply(`Parameter [**${args[set + 1]}**] is not an integer.`);
          return;
        }
        else if (args[set] == "cardback" && (args[set].split(",").length > 2)) {
          message.reply(`Parameter [**${args[set + 1]}**] is not an emoji.`);    
          return;
        }
        else if (args[set] == "stats" && (args[set].split(",").length > 3)) {
          message.reply(`Parameter [**${args[set + 1]}**] is not in the form of "#,#,#", which represent W/L/Games.`);   
          return;
        }
        else if (args[set] == "streak" && (args[set].split(",").length > 2)) {
          message.reply(`Parameter [**${args[set + 1]}**] is not in the form of "#,#", which represent streak/Highest.`);
          return;
        }

        console.log("FOOR");

        db.run(`UPDATE ccData SET ${args[set]} = ${args[set + 1]} WHERE userId = ${target.id}`, function(err, row) {          
          if (err) {
            console.log(err);

            message.reply(`Could not find parameter **${args[set]}** to set value **${args[set + 1]}** of ${target.username}'s profile.`);
            
            set = args.length + 10;
            return;
          }
        });          
        
          console.log(set + "  " + args.length);
        
          if (set + 2 < args.length) {
            output += `${args[set]} to ${args[set + 1]}, `;
          }
        
          if (set + 2 >= args.length && !err) {
            if (set !== 0) { output += `and `;}
            output += `${args[set]} to ${args[set + 1]}.`;
            message.reply(output);
          }
        console.log(output);
        console.log(set);
        console.log("FIVE");
      });      
    }
      console.log("umm");
  });
}