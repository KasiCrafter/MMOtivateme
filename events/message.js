const config = require("../config.json");

exports.run = (client, message) => {
    
    if (message.author.bot) return;
  
    if (message.content.indexOf(config.prefix) !== 0) return;
    
    if (message.content.indexOf("/") !== -1 || message.content.indexOf("..") !== -1) {message.channel.send("Nice try."); return;} 
  
  
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();      

    let commandFile = "";
        
    try { 
     commandFile = require(`../commands/${command}.js`);
    }
    catch (err) {
      console.error(err);
      
      if (command.startsWith(config.prefix)) {
        message.reply(`Input command [**${command}**] has a redundant prefix.`);
      }      
      else {
        message.reply(`Input command [**${command}**] does not exist`);
      }
      return;
    }
  
    if (message.author.id != config.ownerId && message.content.indexOf("cc") == -1) {message.reply("You must be the bot owner to use this command!"); return;}

  
    try {
      commandFile.run(client, message, args);
    }
    catch (err){
      console.error(err);
      message.reply(`Error in **${command}**. Unable to execute command. `);
      return;
    }    
  }