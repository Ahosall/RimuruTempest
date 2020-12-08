const { MessageEmbed } = require('discord.js')

module.exports = (client, message) => {
  client.simpleEmbed = function(description) {//Embed comum com description
        let embed = new MessageEmbed()
            .setDescription(description)
            .setColor(0x2F3136)
            .setFooter(`Executado por ${message.author.username}`, message.author.displayAvatarURL)
            .setTimestamp()
        
        message.channel.send(embed)
      }
      client.errorEmbed = function(description) {//embed de erro
          let embed = new MessageEmbed()
              .setTitle(`**Erro ${message.author.discriminator}**`)
              .setDescription(`${description}`)
              .setColor('RED')
              .setFooter(`Executado por ${message.author.username}`, message.author.displayAvatarURL)
              .setTimestamp()

          message.channel.send(embed)
      }
      client.customEmbed = function(title, description) {//embed com title e description
          let embed = new MessageEmbed()
              .setTitle(`${title}`)
              .setDescription(`${description}`)
              .setColor('RANDOM')
              .setFooter(`Executado por ${message.author.username}`, message.author.displayAvatarURL)
              .setTimestamp()

          message.channel.send(embed)
      }

      client.fieldsEmbed = function(title, description, fields, user) {//embed com title e description
          let embed = new MessageEmbed()
              .setTitle(`${title}`)
              .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true }))
              .setDescription(`${description}`)
              .setColor('RANDOM')
              .addFields(fields)
              .setFooter(`Executado por ${message.author.username}`, message.author.displayAvatarURL)
              .setTimestamp()

          message.channel.send(embed)
      }
}