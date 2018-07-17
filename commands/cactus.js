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
    
    let sliceRoom = args[1].toLowerCase();
        
    if (args[1].startsWith("<")) {
      sliceRoom = args[1].slice(2, -1);
    }
    
    let channelStr = client.channels.find("name", sliceRoom);
    let channelId = client.channels.find("id", sliceRoom);
    
    if (!channelStr) {
      if (!channelId) {
          message.reply(`Could not find host room: **${args[0]}** in server.`);
          return;
      }
      else {
       sliceRoom = ("<" + sliceRoom + ">"); 
      }
    }
    else {
      sliceRoom = ("#" + sliceRoom); 
    }    
      
    message.channel.send(`Challenge **${message.mentions.users.first().username}** to a game of Cactus Cards in **${args[1]}**?`)
    .then(message => {
      message.react("⭕").then(() => message.react("✖"));
    })
    .catch(err => {
      console.error(err);
    });
    
    const filer = (reaction, user) => {
      return ["⭕", "✖"].includes(reaction.emoji.name && user.id === message.author.id);
    };
    
   /*message.react('👍').then(() => message.react('👎'));

    const filter = (reaction, user) => {
      return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '👍') {
            message.reply('you reacted with a thumbs up.');
        }
        else {
            message.reply('you reacted with a thumbs down.');
        }
    })
    .catch(collected => {
        console.log(``);
        message.reply('');
    });*/
        
                    
  }
  console.log("Cactus exited successfully.");
}