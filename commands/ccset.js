const sqlite3 = require('sqlite3').verbose();
const ccinfo = require("../commands/ccinfo.js");
const config = require("../config.json");
const db = new sqlite3.Database('ccUserData');


exports.run = (client, message, args) => {
  this.args = args;
  const regID = /\d{18}(?=>)/;
  
  if (message.author.id !== config.ownerId) { message.reply("You are not authorized to change others' data."); return;}
  
  console.log("Mention count: " + message.mentions.users.size);
  
  if (message.mentions.users.size === 1) {
    for(let m = 0; m < args.length; m++){
      console.log(" M COUNT: " + m);
      console.log(regID.test(args[m]));
      if (regID.test(args[m])) {
       args.splice(m, m + 1); 
        console.log(args);
        break;
      }
    }
  }
  
  console.log("AFTER: " + args);
  
  if (args.length < 2 || args.length % 2 !== 0) {
    message.reply("Not enough parameters, one or more **pairs** are required: the parameter to change, a space, and then the parameter to change it to."); 
    return;
  }
  
  
  let sender = message.author;
  let target = message.mentions.users.first() || sender;
  let output = `Successfully set **${target.username}**'s `;
  
  console.log(sender.id);
  
  
  
  for (let test = 0; test < args.length; test += 2) {  
    for (let com = 2; com < args.length; com += 2) {
      if (args[test] == args[com] && test !== com) {
        message.reply(`Redundant parameters found: **${args[test]}** and **${args[com]}**. Aborting command.`);
        return;
      }
    }
  }
  
  db.serialize( () => {    

    db.get(`SELECT * FROM ccData WHERE userId = ${target.id}`, function(err, row) {
      if (!row) {
        console.error(err);
        message.reply(`User ${target.username} does not have a profile yet! They must create one using the [**ccinfo**] command!`); 
        return; 
      }
      
      else {
        for(let set = 0; set < args.length; set += 2) {          
          db.run(`UPDATE ccData SET ${args[set]} = ${args[set + 1]} WHERE userId = ${target.id}`, function(err, row) {
            console.log("Set: " + set + " Args: " + args);
            if (err) {
              console.log(err);  

              message.reply(`Could not find parameter **${args[set]}** to set value **${args[set + 1]}** of ${target.username}'s profile.`);
              return;
            }
            else if (set + 2 < args.length){
             output += `**${args[set]}** to **${args[set + 1]}**, `; 
            }
            else {
              if (set + 2 != 2) { output += `and `;}
              output += `**${args[set]}** to **${args[set + 1]}**.`;
              
              message.reply(output);
            }
          });
        }      
      }
      
    });   
  });
}