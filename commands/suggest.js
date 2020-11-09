const discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {

    message.delete()

    var embed1 = new discord.MessageEmbed()
        .setDescription(`Do the following: ${config.prefix}suggest (suggestion)!`)
        .setColor(config.color)

    if (!args.length) {
        return message.channel.send(embed1).then(msg => {
            msg.delete({
                timeout: 5000
            })
        })
    }

    let channel = message.guild.channels.cache.find(channel => channel.name == "suggestions")
    if (!channel) return message.channel.send("There is no channel named: suggestions");

    let embed = new discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setThumbnail(message.author.avatarURL())
        .setColor(config.color)
        .setDescription(args.join(" "))
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL())

    channel.send(embed).then(m => {
        m.react(config.yes)
        m.react(config.no)
    })
}

module.exports.help = {
    name: "suggest"
}