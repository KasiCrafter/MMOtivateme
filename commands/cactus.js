const game = require("../standbys/playCactus.js");
const config = require("../config.json");

exports.run = (client, message, args) => {
  
  if (message.channel.type === "dm") {
    message.reply("You cannot challenge others over DM.");
    return;
  }
  
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
  
  ///////
  else if (message.mentions.users.size === 1) {
    
    let orgMessage = message;
    let sender = message.author;
    let opponent = orgMessage.mentions.users.first(); 
    
   /*if (sender.id === opponent.id) {
     message.reply(`You can't challenge *yourself*  to a game.`);
     return;
    }
    else if (opponent.id === client.user.id) {
      message.reply(`You can't challenge the bot to a game.`); 
      return;
   }*/
    
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
          message.reply(`Could not find host room: **${args[1]}** in server.`);
          return;
      }
      else {
       sliceRoom = (channelId); 
      }
    }
    else {
      sliceRoom = (channelStr);//("<#" + channelStr.id + ">"); 
    }
    
    const senderFilter = (reaction, user) => {
      return ["⭕", "✖"].includes(reaction.emoji.name) && user.id === sender.id;
    };
    
    const opponentFilter = (reaction, user) => {
      return ["⭕", "✖"].includes(reaction.emoji.name) && user.id === opponent.id;
    };  
      
    
    message.channel.send(`**${sender.username}**, do you challenge **${opponent.username}** to a game of Cactus Cards in **${sliceRoom}**?`)
    .then(message => {
      message.react("⭕").then(() => { message.react("✖")});
      message.awaitReactions(senderFilter, {max: 1, time: (config.cactusTimer / 1), errors: ['time']})
      .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === "⭕") {                                
          const challengeReq = message;
          opponent.createDM()
            .then(dmChannel => {
              dmChannel.send(`User **${sender.username}** has challenged you to a game of Cactus Cards in the **${sliceRoom}** channel of the **${orgMessage.guild.name}** server. Do you accept?`)
              .then(dmRq => {                      
                challengeReq.edit(`Challenge sent to **${opponent.username}**. Awaiting responce...`);
                challengeReq.clearReactions()
                .then(() => {
                  dmRq.react("⭕").then(() => { dmRq.react("✖")}); 
                  dmRq.awaitReactions(opponentFilter, {max: 1, time: (config.cactusTimer / 1), errors: ["time"]})
                  .then(duelRes => {
                        let reply = duelRes.first();

                        if (reply.emoji.name === "⭕") {
                          dmRq.delete();
                          dmChannel.send(`Accepted challenge from **${sender.username}** on **${orgMessage.guild.name}**! \n \nClick the room name here to play: **${sliceRoom}**!`);
                          challengeReq.edit(`**${opponent.username}** has accepted your challenge in ${sliceRoom}, **${sender.username}**! Get ready!`);
                          game.run(client, message, [orgMessage.author, opponent, sliceRoom]);
                          return;
                        }
                        else if (reply.emoji.name === "✖") {
                          dmRq.delete();
                          dmChannel.send(`You have declined **${sender.username}**'s challenge from the **${(orgMessage.guild.name)}** server.`);
                          challengeReq.edit(`**${opponent.username}** has declined your challenge, **${sender.username}**.`);                              
                        }
                      })
                    .catch(() => {
                      dmRq.delete();
                      dmChannel.send(`The challenge from **${sender.username}** of the **${orgMessage.guild.name}** server has expired.`);
                      challengeReq.edit(`**${sender.username}**, your challenge to **${opponent.username}** has expired.`);
                    //})
                    })
                  })
                })                    
              });
            }

        else if (reaction.emoji.name === "✖") {
          message.edit(`**${sender.username}**, you have cancelled your challenge to **${opponent.username}**.`);              
          message.clearReactions();
        }            
      })
      .catch(err => {
        console.error(err);
        message.edit(`**${sender.username}**, your challenge request to **${opponent.username}** has expired.`);
        message.clearReactions();
      }); 
      });                    
  }
  console.log("Cactus exited successfully.");
}