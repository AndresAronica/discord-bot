module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(msg) {
        msg.channel.send('pong');
    },
};