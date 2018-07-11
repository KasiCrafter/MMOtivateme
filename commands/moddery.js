exports.run = (client, message, [mention, ...reason]) => {
  const modRole = message.guild.roles.find("name", "Mods") || "NERDS";
  
  message.channel.send(modRole);
  if (modRole) {
    return console.log("The MODS role does not exist.");
  }
}