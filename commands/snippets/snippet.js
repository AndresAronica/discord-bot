// TODO Que traiga los snippets desde una base, no que esten hardcodeados aca
module.exports = {
	name: 'snippet',
	description: 'Let you ask for some snippets',
	args: true,
	usage: '<snippetName>',
	execute(msg, args) {
		if (args[0] === 'let')
			return msg.channel.send('```let miVar = 534;```');
	},
};