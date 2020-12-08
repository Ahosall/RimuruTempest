const Discord = require('discord.js');
const canvacord = require("canvacord");

module.exports = {
  run: async (client, message, args, db) => {
		const userData = {
			level: db.member.sysXP.level,
			xp: db.member.sysXP.xp,
			requiredXP: db.member.sysXP.requiredXP
		};

    const rank = new canvacord.Rank()
			.setAvatar(message.author.displayAvatarURL({ format: 'png' }))
			.setLevel(userData.level)
			.setCurrentXP(userData.xp)
			.setRequiredXP(userData.requiredXP)
			.setStatus("online")
			//.setBackground('IMAGE', 'https://cdnb.artstation.com/p/assets/images/images/010/369/695/large/geovani-angelo-background.jpg')
			.setProgressBar("#0000FF", "COLOR")
			.setUsername(message.author.username)
			.setDiscriminator(message.author.discriminator);

    rank.build()
			.then(data => {
					const attachment = new Discord.MessageAttachment(data, "RankCard.png");
					message.channel.send(attachment);
			});
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


