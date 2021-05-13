module.exports = {
	name: 'server-info',
	description: 'It will give you some basic information about the server',
	execute(msg) {
		// TODO formatear la hora
		// TODO primera letra de la region ponerla en caps
		msg.channel.send(`Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}\nCreated at: ${msg.guild.createdAt}\nRegion: ${msg.guild.region}`);
	},
};