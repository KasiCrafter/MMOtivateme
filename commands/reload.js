exports.run = (client, message, args) => {
  if (!args || args.length < 1) return message.reply("Must provide a command name to reload.");
  
  try {
    delete require.cache[require.resolve(`./${args[0]}.js`)];
  }
  catch (err) {
   message.reply(`Command "${args[0]}" does not exist.`);
    return;
  }

  message.reply(`The command ${args[0]} has been reloaded.`);
};