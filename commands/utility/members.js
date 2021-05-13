module.exports = {
	name: 'members',
	description: 'It will give you some basic information about the members on this server',
	execute(msg) {
		msg.channel.send(`Owner: ${msg.guild.owner}`);
	},
};