const Discord = require('discord.js');
const chalk = require('chalk');
const mongoose = require('mongoose');

const UserSchema = require('../models/users')
const MemberSchema = require('../models/members')
const GuildSchema = require('../models/guilds')

const api = require('../utils/api');
const { response } = require('express');

module.exports = async (client, message) => {
	if (message.author.bot || message.author.id == client.user.id) return
  
	require('../utils/embeds')(client, message);
	
	let db               =  mongoose
	
		db.guildSchema   =  GuildSchema
		db.userSchema    =  UserSchema
		db.memberSchema  =  MemberSchema

		db.guild = await api.get(`/guilds/${message.guild.id}`).then(async (response) => { 
			return await response.data;
		}).catch((err) => {
			return null;
		});

		db.member = await api.get(`/members/${message.author.id}`).then(async (response) => { 
			return await response.data;
		}).catch((err) => {
			return null;
		});

		db.user = await api.get(`/users/${message.author.id}`).then(async (response) => { 
			return await response.data;
		}).catch((err) => {
			return null;
		});

	/*
		* Se por a caso o bot for adicionado em um servidor enquanto ele estiver off
		* este script ira adicionar os dados necessários.
		*/

	if (!db.guild) {
		let msg = await message.channel.send('**Registrando servidor no database ...**')

		db.guild = api.post("/guilds", {
			id: message.guild.id,
			guildName: message.guild.name,
			ownerName: message.guild.members.cache.find(m => m.id == message.guild.ownerID).user.username,
			ownerId: message.guild.ownerID,
		}).then(async (response) => {
			await setTimeout(()=> {
				msg.edit('**Servidor registrado.**').then(m => {
				m.delete({timeout: 3000})
				});
			}, 1000);

			return await response.data;
		}).catch((err) => {
			let code = "Guild";
			
			msg.edit('Erro ao registrar Servidor, código do erro: ' + code).then(m => {
				m.delete({timeout: 3000})
			});

			console.log(code, "ERROR", "\n\n\n\n", err);
		});

		
	} else if (!db.member) {
		let msg = await message.channel.send('**Registrando membro ...**');

		db.member = api.post("/members", {
			id: message.author.id
		}).then(async (response) => {
			msg.edit('**Membro registrado.**').then(m => {
				m.delete({timeout: 3000})
			});
			
			return await response.data;
		}).catch((err) => {
			let code = "member";

			msg.edit('Erro ao registrar Membro, código do erro: ' + code).then(m => {
				m.delete({timeout: 3000});
			});
			console.log(code, "++ERROR++", "\n\n\n\n", err)
		});
	} else if (!db.user) {
		message.react("🔄").then(msg => {
			db.user = api.post("/users", {
				id: message.author.id
			}).then(async (response) => {
				msg.remove();
	
				message.react('✅').then(m => {
					setTimeout(()=> {
						m.remove()
					}, 3000);
				});
				
				return response.data;
			}).catch((e) => {
	
				setTimeout(()=> {
					message.react('❌').then(m => {
						m.remove()
					});
				}, 3000);
	
				console.log('user', "--ERROR--\n\n\n", e)
			});
		});
	}

	let prefix;
	
	try {
		prefix = db.guild.get('prefix');
	} catch(e) {
		prefix = 'r!';
	}

	if (message.content == '<@!' + client.user.id + '>') {
		let prefixo;
		
		if (db.guild) {
			prefixo = db.guild.prefix
		} else {
			prefixo = 'r!'
		}
		
	  	client.fieldsEmbed(client.user.username, '', [
			{ name: 'Prefixo', value: db.guild.prefix },
			{ name: 'Links', value: `[Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=268758208)\nWebSite(Em desenvolvimento` }
		], client.user)
	}
  
  if (message.content.indexOf(prefix) !== 0) return

  let args = message.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase()
  const cmd = client.commands.get(command)

  if (!cmd) return
	
	// if (message.author.id != 683703998729027769 ) return message.reply('Em fase de desenvolvimento.').then((msg) => { msg.delete({ timeout: 5000 }) });

  let cmds = db.member.cmdsExecutados;

  await client.updateMember(message.guild.members.cache.find(m => m.id == message.author.id).user, {
    cmdsExecutados: ++cmds
  })

  console.log(`[${chalk.yellow('LOG')}]`, `${message.author.username} (${chalk.magenta(message.author.id)}) ran the command: ${chalk.yellow(cmd.help.name)}`)   
  if (cmd.conf.onlyguilds && !message.guild) return messsage.reply('teste')

  cmd.run(client, message, args, db)
}
