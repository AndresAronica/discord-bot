module.exports = {
	name: 'args-info',
	description: 'This is a test command, with information about the arguments provided',
	// Requiere argumentos
	args: true,
	// 'Explica' como se deberia usar
	usage: '<argument/s>',
	execute(msg, args) {
		if (args[0] === 'foo')
			return msg.channel.send('bar');

		msg.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};