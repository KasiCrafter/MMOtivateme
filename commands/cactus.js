exports.run = (client, message, args) => {
  if (args.length !== 2) {
    message.reply(`Please enter the correct number of arguments in the format of "!cactus @mention roomName"`); 
    return;
  }
  
  if (message.mentions.users.size < 1) {
    message.reply("No users were mentioned to challenge!");
    return;
  }
  else if (message.mentions.users.size > 1) {
   message.reply("Too many users were mentioned in the challenge!"); 
   return;
  }
  else if (message.mentions.users.size === 1) { 
    
    let sliceName = args[0].slice(2, -1);
    
    if (message.mentions.users.first().id !== sliceName) {
      message.reply(`Please use the mention as the **first** argument of the command "!cactus @mention roomName"`);
      return;    
    }
    
    let sliceRoom = args[1];
        
    if (args[1].startsWith("<")) {
      sliceRoom = args[1].slice(2, -1);
    }
    
    let channelStr = client.channels.find("name", sliceRoom);
    let channelId = client.channels.find("id", sliceRoom);
    
    if (!channelStr) {
      if (!channelId) {
          message.reply(`Could not find host room: **${sliceRoom}** in server.`);
      }
    }
    
     message.reply(`Challenge **${message.mentions.users.first().username}** to a game of Cactus Cards in **${args[1]}**?`);
  }
  console.log("Cactus exited successfully.");
}