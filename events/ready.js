exports.run = (client) => {
  let trimCats = 0;
  let botCount = 0;
  
  client.guilds.forEach(server => {
      console.log("SERVER: " + server.name);
      
      server.channels.forEach(type => {
        if (type.type === "category") {
          trimCats++;
        }
        else {
          console.log("ROOM NAME: " + type.name + " | ROOM TYPE: " + type.type);        
        }  
      });     
    
  });      
  
  client.users.forEach(table => {
      if (table.bot) {
        console.log("BOT: " + table.username);
        botCount++;
      }
      else {
        console.log("USER: " + table.username);
      }

  });
  
  console.log(`Ready to serve in ${trimCats} channels on ${client.guilds.size} servers, for a total of ${client.users.size - botCount} users.`);

  console.timeEnd("boot");
}