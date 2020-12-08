const Discord = require('discord.js');

module.exports = {
  run: async (client, message, args) => {
    // command ping.
    console.log('OK')
  },
  conf: {},
  get help() {
    return {
      name: "config",
      category: "Administration",
      description: "Use este comando para me configurar. Use `r!config help` para saber todas as minhas configurações.",
      usage: "config [<name-config>|help] (options)"
    };
  }
};
