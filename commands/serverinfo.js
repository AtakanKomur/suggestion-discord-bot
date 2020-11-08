const discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    var serverEmbed = new discord.MessageEmbed()
        .setTitle(`Serverinfo - ${message.guild.name}`)
        .setColor(config.color)
        .setTimestamp()
        .setThumbnail(message.author.avatarURL())
        .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL())

        .addFields({
                name: "Server name:",
                value: message.guild.name,
            }, {
                name: "Owner:",
                value: message.guild.owner.user.tag
            }, {
                name: "Users:",
                value: message.guild.memberCount,
            }, {
                name: "Channels:",
                value: client.channels.cache.size,
            }, {
                name: "Roles",
                value: message.guild.roles.cache.size,
            }

        )



    return message.channel.send(serverEmbed);

}
exports.help = {
    name: "serverinfo",
}