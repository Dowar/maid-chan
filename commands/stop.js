//========================================================================================//
//  Stop Bot
//========================================================================================//
exports.run = async (client, message, args, level) => 
{
  await message.reply("Le bot est en train de s'éteindre.")
  client.commands.forEach( async cmd => 
  {await client.unloadCommand(cmd)})
  process.exit(1)
}

exports.conf = 
{
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Admin Bot"
}

exports.help = 
{
  name: "stop",
  category: "Système",
  description: "Arrète le bot.",
  usage: "reboot"
}
