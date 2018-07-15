const config = require("../config.json");

exports.run = (client, message) => {
    
    if (message.author.bot) return;
  
    if (config.doExp && message.channel.type !== "dm") {
      try {
        let standByFile = require("../standbys/leveling.js");
        standByFile.run(client, message);
      }
      catch (err) {
        console.error(err);
      }      
    }
  
    if (message.content.indexOf(config.prefix) !== 0) return;
  
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    if (message.content.indexOf("/") !== -1 || message.content.indexOf("..") !== -1) {message.channel.send("Nice try."); return;}        

    let commandFile = "";
        
    try { 
     commandFile = require(`../commands/${command}.js`);
    }
    catch (err) {
      console.error(err);
      message.reply(`Input command [**${command}**] does not exist`);
      return;
    }

  
    try {
      commandFile.run(client, message, args);
    }
    catch (err){
      console.error(err);
      message.reply(`Error in **${command}**. Unable to execute command. `);
      return;
    }    
  }