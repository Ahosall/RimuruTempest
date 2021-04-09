require('dotenv').config();

if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');

const Discord   = require('discord.js');
const mongoose  =   require('mongoose');
const Enmap     =      require('enmap');
const chalk     =      require('chalk');
const { join }  = 		require('path');

const { readdirSync } = require('fs');

const client = new Discord.Client({
  disableMentions: 'everyone',
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

const api = require('./utils/api.js');

client.commands = new Enmap()
client.startTime = Date.now()

const db = require('./utils/database');

require("./utils/functions")(client);

client.config = require("./utils/dbConfigs");

module.exports = client

console.log(`[${chalk.yellow('Starting')}] Bot!`)

// Load commands
readdirSync(join(__dirname, "commands")).forEach(dir => { 
    const commands = readdirSync(`./src/commands/${dir}/`).filter(file => file.endsWith(".js")); 

    commands.forEach(f => {
	  try {
	    const props = require(`./commands/${dir}/${f}`)

	    if (dir == 'admin') {
	    	console.log(`\n[${chalk.yellow('LOADING')}] ${commands.length} administration commands.\n`)
    	} else if (dir == 'info') {
    		console.log(`\n[${chalk.yellow('LOADING')}] ${commands.length} info commands.\n`)
    	} else if (dir == 'profile') {
    		console.log(`\n[${chalk.yellow('LOADING')}] ${commands.length} profile commands.\n`)
    	} else if (dir == 'utils') {
    		console.log(`\n[${chalk.yellow('LOADING')}] ${commands.length} utils commands.\n`)
    	}

	    console.log('#', props.help.name, `[${chalk.green('status: Ok')}]`)

	    if (props.init) props.init(client)

	    client.commands.set(props.help.name, props)

	    if (props.help.aliases) {
	      props.alias = true
	      props.help.aliases.forEach(alias => client.aliases.set(alias, props))
	    }
	  } catch (e) {
	    console.log(f, `status: ·:{{[[ ${chalk.red('ERROR')} ]]}}:·`)
	    console.log(e)
	  }
	})
});

console.log(`\nAll commmands have been ${chalk.green('LOADED')}!`);

// Load events
console.log(`\n[${chalk.yellow('LOADING')}] Events.\n`)

readdirSync('./src/events/').forEach(f => {
  const eventName = f.split('.')[0]
  const event = require(`./events/${f}`)
  try {
  	console.log(`[ ${chalk.green('Ok')} ]`, eventName)
  	client.on(eventName, event.bind(null, client))
  } catch(err) {
  	console.log(`[ ${chalk.red('Err')} ]`, eventName)
  	console.log('\n\n', err, '\n\n')
  }
})

let cmd = client.commands.map(cmd => cmd.help);

cmd.forEach(command => {
	try {
		api.get(`/commands/${command.name}`)
			.then((response) => {
				if (!response.data) {
					api.post("/commands", {
						name: command.name,
						description: command.description,
						aliases: command.alias
					});
				}
			})
			.catch((err) => {
				console.error("ops! ocorreu um erro" + err);
			});
	} catch(err) {
		api.post("/commands", {
			name: command.name,
			description: command.description,
			aliases: command.alias
		});
	}
	
});

console.log(`\nAll events have been ${chalk.green('LOADED')}!`);

db.then(() => console.log(`\n[ ${chalk.green('OK')} ] Connected to MongoDB`)).catch((err) => { console.log(`| ${chalk.red('ERR')} |`, err) });

client.login(process.env.AUTH_TOKEN);