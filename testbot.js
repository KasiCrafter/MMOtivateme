console.time("boot");
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const heartbeat = require("./heartbeat.js");

console.log("Bot is initializing...");

//initialize http ping every 5 minutes as to keep the bot from timing out once 15 minutes pass.
heartbeat.run();

//Entering main bot code

 fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        client.on(eventName, (...args) => eventFunction.run(client, ...args));      
    });
  }); 



client.login(process.env.TOKEN).catch(console.error);

