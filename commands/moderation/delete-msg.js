module.exports = {
	name: 'delete-msg',
	description: 'This will delete server messages, in a range from 2 to 100. It will not delete messages older than 2 weeks',
	execute(msg, args) {
		// Tambien borra el mensaje que esta mandando como comando para borrar. Se puede evitar, pero yo quiero que tambien lo borre
		const amount = parseInt(args[0]);

		if (isNaN(amount))
			return msg.reply('That\'s not a number');
		else if (amount < 2 || amount > 100)
			return msg.reply('The number must be between 2 and 100');

		// Borra X cantidad de mensajes del chat, el metodo tiene limites de entre 2 y 100 mensajes, por eso la validacion
		// El segundo parametro sirve para que si trata de borrar mensajes de +2 semanas de antigüedad pero tambien mensajes mas nuevos, solo borra los nuevos
		// El catch esta porque si solo trata de borrar mensajes viejos (+2 semanas), tira error
		msg.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			msg.channel.send('No se como mierda borrar mensajes tan viejos');
		});
	},
};