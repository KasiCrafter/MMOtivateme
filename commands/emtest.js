exports.run = (client, message) => {
  message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.iconURL
    },
    
    title: "This is an embed",
    url: "http://google.com",
    description: "This is a test embed to see what they look like and what they can do!",
    fields: [
      {
        name: "Fields",
        value: "They can have different fields with small headlines!"
      },
      {
        name: "Masked links",
        value: "You can put [masked links](http://google.com) inside of rich embeds."
      },
      {
        name: "Markdown",
        value: "You can put all the *usual* **__Markdown__** inside of them."
      }
    ],
    
    timestamp: new Date(),
    footer: {
      iconURL: client.user.avatarURL,
      text: "© Example"
    }
             
  }});
 /* const Discord = require("./discord.js");
  const embed = new Discord.RichEmbed()
    .setTitle("This is your title, it can gold 256 characters")
    .setAuthor("Author Name", client.user.iconURL)
    .setColor("#00AE36")
    .setDescription
              
  ;*/
}