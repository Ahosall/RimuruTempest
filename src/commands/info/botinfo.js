const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args) => {
    // command ping.
    console.log('OK')
  },
  conf: {},
  get help() {
    return {
      name: "botinfo",
      category: "Info",
      description: "Use este comando para mais sobre mim.",
      usage: "botinfo"
    };
  }
};
