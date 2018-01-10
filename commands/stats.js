const { version } = require("discord.js")
const moment = require("moment")
require("moment-duration-format")

exports.run = (client, message, args, level) => 
{
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")
  message.channel.send(`= STATISTIQUE =
• RAM utilisé  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Temps Fonct. :: ${duration}
• Utilisateurs :: ${client.users.size.toLocaleString()}
• Serveurs     :: ${client.guilds.size.toLocaleString()}
• Canaux       :: ${client.channels.size.toLocaleString()}
• Discord.js   :: v${version}
• Node         :: ${process.version}`, {code: "asciidoc"})
}

exports.conf = 
{
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Utilisateur"
}

exports.help = 
{
  name: "stats",
  category: "Divers",
  description: "Donne quelques statistiques sur le bot.",
  usage: "stats"
}
