const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async message => {

  if (message.author.bot) return;

  if (message.channel.type === "dm") return;

  var prefix = config.prefix;

  var messageArray = message.content.split(" ");

  var command = messageArray[0];

  var commands = client.commands.get(command.slice(prefix.length));

  var args = messageArray.slice(1);

  var commands = client.commands.get(command.slice(prefix.length));

  if (commands) commands.run(client, message, args);

});

// Hier begint je command

if (msg.content === `suggestie`) {

  message.delete()

  var embed1 = new discord.MessageEmbed() //Deze embed krijg je als je /suggestie doet!
    .setDescription(`Doe dit als je een suggestie wilt indienen: ${config.prefix}suggestie (suggestie)!`)
    .setColor(config.color)

  if (!args.length) {
    return message.channel.send(embed1).then(msg => {
      msg.delete({
        timeout: 5000
      })
    })
  }

  let channel = message.guild.channels.cache.find(channel => channel.name == "suggestions") //Pas deze channel naam aan naar je eigen channel name.
  if (!channel) return message.channel.send("Er is geen channel genaamd suggestions.");// Deze melding krijg je als wat hier boven staat niet bestaat.

  let embed = new discord.MessageEmbed() 
    .setAuthor(message.author.tag, message.author.avatarURL()) 
    .setThumbnail(message.author.avatarURL())
    .setColor(config.color)
    .setDescription(args.join(" "))
    .setTimestamp()
    .setFooter(`Aangevraagd door: ${message.author.tag}`, message.author.avatarURL())

  channel.send(embed).then(m => {
    m.react(config.yes)
    m.react(config.no)
  })
}

client.login(config.token)