exports.run = (client, message, args) => {
  if (!args || args.length < 1) return message.reply("Must provide a command name to reload.");
  
  try {    
    if (args[0] === "reload") { message.reply("Reload can not recursively reload itself."); return;}
    else if (args.length == 1) {
      delete require.cache[require.resolve(`./${args[0]}.js`)];
    }
    else if (args.length == 2) {
      //message.reply(`${args[1]}/${args[0]}`);
      delete require.cache[require.resolve(`../${args[1]}/${args[0]}.js`)];
    }
    else {
       message.reply(`Command rejected with ${args.length} arguments. Please input 1 if reloading commands (name), or 2 arguments if loading events (name, folderName).`);
      return;
    }
  }
  catch (err) {
   message.reply(`Command [**${args[0]}**] does not exist.`);
    return;
  }

  message.reply(`The command [**${args[0]}**] has been reloaded.`); 
};