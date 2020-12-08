const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args) => {
    const m = message.channel.send('Ping ?');
		m.edit(`Pong! \`${m.createdTimestamp - message.createdTimestap}\`ms`)
    console.log('OK')
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
