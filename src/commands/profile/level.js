const Discord = require('discord.js');
const canvacord = require("canvacord");

const userData = {
  xp: 0,
  requiredXP: 100
};

module.exports = {
  run: async (client, message, args) => {
    const rank = new canvacord.Rank()
        .setAvatar(message.author.displayAvatarURL())
        .setCurrentXP(userData.xp)
        .setRequiredXP(userData.requiredXP)
        .setStatus("online")
        .setProgressBar("#0000FF", "COLOR")
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator);

    rank.build()
        .then(data => {
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            message.channel.send(attachment);
        });
    console.log('OK')
  },
  conf: {},
  get help() {
    return {
      name: "level",
      category: "profile",
      description: "Use este comando para ver o level de um usuário ou o seu.",
      usage: "level [<user>]"
    };
  }
};


