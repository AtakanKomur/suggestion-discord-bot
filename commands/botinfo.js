const discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {
    var serverEmbed = new discord.MessageEmbed()
        .setTitle("Botinfo - Suggestion")
        .setColor(config.color)
        .setURL('https://discord.com/api/oauth2/authorize?client_id=746840167389855775&permissions=379990&scope=bot')
        .setTimestamp()
        .setThumbnail(config.logo)
        .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL())

        .addFields({
                name: "Name:",
                value: client.user.username,
                inline: true
            }, {
                name: "Nickname:",
                value: client.user.nickname || "None",
                inline: true
            }, {
                name: "ID:",
                value: client.user.id,
                inline: true
            }, {
                name: "prefix:",
                value: config.prefix,
                inline: true
            }, {
                name: "Total users in guilds:",
                value: client.users.cache.size,
                inline: true

            }, {
                name: "discord.js version:",
                value: config.dcjs,
                inline: true
            }, {
                name: "Guilds",
                value: client.guilds.cache.size,
                inline: true
            }, {
                name: "Gemaakt op:",
                value: client.user.createdAt.toDateString(),
                inline: true
            }, {
                name: "Developer",
                value: config.developer,
                inline: true
            }

        )



    return message.channel.send(serverEmbed);

}
exports.help = {
    name: "botinfo",
}