module.exports = {
	name: 'ping',
	description: 'Ping!',
	// Tiempo que tenes que esperar entre call y call.
	cooldown: 5,
	execute(msg) {
		msg.channel.send('pong');
	},
};