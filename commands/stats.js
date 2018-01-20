//========================================================================================//
//  Afficher Statistiques
//========================================================================================//
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
//========================================================================================//
//  Config
//========================================================================================//
exports.conf = 
{
  enabled: true,
  guildOnly: false,
  aliases: ["stat"],
  permLevel: "Utilisateur"
}
//========================================================================================//
//  Aide
//========================================================================================//
exports.help = 
{
  name: "stats",
  category: "Divers",
  description: "Affiche des statistiques sur le bot.",
  usage: "stats"
}
