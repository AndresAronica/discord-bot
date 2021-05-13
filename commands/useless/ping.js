module.exports = {
	name: 'ping',
	description: 'Ping!',
	// Tiempo que tenes que esperar entre call y call.
	// TODO Implementar
	cooldown: 5,
	execute(msg) {
		msg.channel.send('pong');
	},
};