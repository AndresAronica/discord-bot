module.exports = {
	name: 'avatar',
	description: 'This will show the avatars of the tagged user(s), or your own if none',
	execute(msg) {
		if (!msg.mentions.users.size)
		// Si se le pasa dynamic: true, si la imagen es un gif, lo muestra como gif, sino como el tipo que se aclare en format
			return msg.channel.send(`Your avatar: ${msg.author.displayAvatarURL({ format: 'png', dynamic: true })}`);


		const avatarList = msg.mentions.users.map(user => {
			return `${user.username}'s avatar: ${user.displayAvatarURL({ format: 'png', dynamic: true })}`;
		});

		msg.channel.send(avatarList);
	},
};