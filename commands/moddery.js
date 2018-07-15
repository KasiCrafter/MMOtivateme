exports.run = (client, message, [mention, ...reason]) => {
  const modRole = message.guild.roles.find("name", "Mods") || "NERDS";
  

  if (!modRole) {
   return console.log("The MODS role does not exist.");
  }
  
  message.channel.send(modRole);
}