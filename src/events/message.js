const Discord = require('discord.js')
const chalk = require('chalk')
const mongoose = require('mongoose')

const UserSchema = require('../models/users')
const MemberSchema = require('../models/members')
const GuildSchema = require('../models/guilds')

module.exports = async (client, message) => {
  if (message.author.bot || message.author.id == client.user.id) return
  if (message.author.id != 683703998729027769 ) return message.reply('Em fase de desenvolvimento.').then((msg) => { msg.delete({ timeout: 5000 }) });

  require('../utils/embeds')(client, message);

  const db               =  mongoose
        db.guild         =  await client.getGuild(message.guild)
        db.member        =  await client.getMember(message.guild.members.cache.find(m => m.id == message.author.id).user)
        db.user          =  await client.getUser(message.author)
        db.guildSchema   =  GuildSchema
        db.userSchema    =  UserSchema
        db.memberSchema  =  MemberSchema

  /**
    * Se por a caso o bot for adicionado em um servidor enquanto ele estiver off
    * este script ira adicionar os dados necessários.
    */
	if(!db.guild) {
	  let msg = await message.channel.send('**Registrando servidor no database ...**')

	  const newGuild = await client.createGuild({
	    guildId: message.guild.id,
	    guildName: message.guild.name,

	    ownerName: message.guild.members.cache.find(m => m.id == message.guild.ownerID).user.username,
	    ownerId: message.guild.ownerID,
	      
	  }).then(async () => {
	    
	    return setTimeout(()=> {
	      msg.edit('**Servidor registrado.**').then(m => {
	        m.delete({timeout: 3000})
	      })
	    }, 1000)
	  })
	} else if(!db.member) {
	  let msg = await message.channel.send('**Registrando usuário ...**')
	  
	  const newProfile = await client.createMember({
	      id: message.author.id
	    }).then(async () => {
	      client.createUser({
	        id: message.author.id
	      }).then(async () => {            
	        console.log(`[${chalk.yellow('LOG')}]`, message.author.username, 'Registered')
	        return setTimeout(()=> {
	          msg.edit('**Usuário registrado.**').then(m => {
	            m.delete({timeout: 3000})
	          })
	        }, 1000)

	        return msg.delete({timeout: 3000})            
	      }).catch((err) => {
	        console.log(err)
	      })
	  }).catch((err) => {
	    console.log(err)
	  })
	}

	if (message.content == '<@!' + client.user.id + '>') {
	  if (db.guild.config.prefix != null) {
	    client.fieldsEmbed(message.author.tag, '', [
	      { name: 'Prefixo', value: db.guild.config.prefix },
	      { name: 'Links', value: '[Invite](https://discord.com/api/oauth2/authorize?client_id=${process.env.WEB_CLIENT_ID}&permissions=268758208)\nWebSite(Em desenvolvimento)' }
	    ])
	  } else {
	    message.reply(`Prefixo: ${db.guild.prefix}\n\nMe adicione em seu servidor: https://discord.com/api/oauth2/authorize?client_id=${process.env.WEB_CLIENT_ID}&permissions=268758208\n\nWebSite: Nenhum por Enquanto.`)
	  }
	}

  let prefix = db.guild.get('prefix');
  
  if (message.content.indexOf(prefix) !== 0) return

  let args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command)

  if (!cmd) return
  let cmds = db.member.cmdsExecutados;

  await client.updateMember(message.guild.members.cache.find(m => m.id == message.author.id).user, {
    cmdsExecutados: ++cmds
  })


  console.log(`[${chalk.yellow('LOG')}]`, `${message.author.username} (${chalk.magenta(message.author.id)}) ran the command: ${chalk.yellow(cmd.help.name)}`)   
  if (cmd.conf.onlyguilds && !message.guild) return messsage.reply('teste')

  cmd.run(client, message, args, db)
}
