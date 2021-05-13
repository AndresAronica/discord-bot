module.exports = {
	name: 'kick',
	description: 'This is \'kick\' command, it doesn\'t actually kick anyone',
	// Este comando solo se puede ejecutar en 'guilds' -> Servers
	guildOnly: true,
	execute(msg) {
		if (!msg.mentions.users.size)
			// .reply hace lo mismo que .channel.send pero tagea al usuario que mando el mensaje
			return msg.reply('You need to tag someone to kick');


		const taggedUser = msg.mentions.users.first();
		msg.channel.send(`You wanted to kick: ${taggedUser.username}`);
	},
};