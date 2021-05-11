module.exports = {
    name: 'args-info',
    description: 'This is a test command, with information about the arguments provided',
    execute(msg, args) {
        if (!args.length) {
            return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
        } else if (args[0] === 'foo') {
            return msg.channel.send('bar');
        }
        msg.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
    },
};