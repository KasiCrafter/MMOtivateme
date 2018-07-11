exports.run = (client, message) => {
  message.channel.send({embed: {
    color: 3447003,
    description: "A very simple embed!",
    author: {
      name: client.user.username,
      icon_url: client.user.iconURL
    }
  }});
}