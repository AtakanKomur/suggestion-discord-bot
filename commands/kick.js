const Discord = require("discord.js")
const config = require("../config.json")

exports.run = async (client, message, args) => {

    var kickperm = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription("You need the following perms: `KICK_MEMBERS`");

    var kickmention = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription("You need to `mention` someone to kick");

    var kickfound = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription("No person found");

    var kickmod = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription("You can't kick someone with permission: `MANAGE_MESSAGES`!");

    var kickreason = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription("You need to give an reason to kick someone")

    if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply(kickperm);

    var user = message.mentions.users.first();
    if (!user) return message.reply(kickmention)


    var member;

    try {
        member = await message.guild.members.fetch(user);
    } catch (err) {
        member = null;
    }

    if (!member) return message.reply(kickfound)
    if (member.hasPermission('MANAGE_MESSAGES')) return message.reply(kickmod)

    var reason = args.splice(1).join(' ');
    if (!reason) return message.reply(kickreason)
    var log = new Discord.MessageEmbed()
        .setColor(config.color)
        .setDescription(`${member} kicked for ${reason}!`)
    message.channel.send(log);

    var embed = new Discord.MessageEmbed()
        .setTitle("Banned")
        .setDescription(`You have been kicked from this server: ${message.guild}, and for this reason: ${reason}`)
        .setColor(config.color)


    try {
        await user.send(embed);
    } catch (err) {
        console.warn(err);
    }

    member.kick({
        reason: reason
    })
}

exports.help = {
    name: "kick",
}