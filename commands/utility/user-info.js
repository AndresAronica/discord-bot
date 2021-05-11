module.exports = {
    name: 'user-info',
    description: 'It will give you some basic information about the user that sends this message',
    execute(msg) {
        msg.channel.send(`Your username: ${msg.author.username}\nYour ID: ${msg.author.id}`);
    },
};