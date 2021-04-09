const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args) => {

    let chan = message.guild.roles.cache.find(x => x.name == "Usuário Comum");
    //return console.log(chan)
    // Update or Create permission overwrites for a message author
    message.channel.updateOverwrite(chan, {
      SEND_MESSAGES: true
    })
      .then(role => console.log(role.permissionOverwrites.get(chan)))
      .catch(console.error);
  },
  conf: {},
  get help() {
    return {
      name: "ping",
      category: "Utils",
      description: "Use este comando para ver meu ping",
      usage: "ping"
    };
  }
};