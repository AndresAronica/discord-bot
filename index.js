// TODO Podria buscar alguna forma de hacer que los mensajes devueltos por los comandos sean multilingues, solo por curiosidad
// fs es el modulo de fileSystem que provee node.js
const fs = require('fs');
const Discord = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();

const { TOKEN, prefix } = process.env;

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

// Preparo una coleccion con todos mis comandos, leyendo desde la carpeta 'commands'
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	// Al contenido del mensaje le saca el prefijo (.length para sacarlo sea un caracter o 10), .trim para sacarle los espacios a los argumentos, y .split para separar cada palabra (argumento), creando un array args con todos los argumentos. Hasta aca, en args todavia esta el comando tambien, junto con los argumentos
	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	// .shift saca el 'comando' del array de 'args' (para mantener separados dos conceptos diferentes)
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	if (command.guildOnly && msg.channel.type === 'dm')
		return msg.reply('This command cannot be used inside DMs');

	// Si en los archivos commands se setea args: true va a hacer este check
	// Es generico, en vez de tener que ponerlo en cada command que espera argumentos
	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${msg.author}. `;

		// Si el comando aclara como se deberia usar, se lo agrega al mensaje de 'error'
		if (command.usage)
			reply += `The proper use would be: \`${prefix}${commandName} ${command.usage}\``;

		return msg.channel.send(reply);
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name))
		cooldowns.set(command.name, new Discord.Collection());

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(msg.author.id)) {
		const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return msg.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the '${command.name}' command`);
		}
	}

	timestamps.set(msg.author.id, now);
	setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

	try {
		command.execute(msg, args);
	}
	catch (error) {
		console.error(error);
		msg.reply('Eso no es un comando valido loro');
	}
});

client.login(TOKEN);