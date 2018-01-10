exports.run = async (client, message, args, level) => 
{
  if (!args || args.length < 1) return message.reply("tu doit spécifier une commande à relancer.")
  let response = await client.unloadCommand(args[0])
  if (response) return message.reply(`Error Erreur de déchargement: ${response}`)
  response = client.loadCommand(args[0])
  if (response) return message.reply(`Erreur de chargement: ${response}`)
  message.reply(`La commande \`${args[0]}\` a été recharger`)
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
  name: "reload",
  category: "Système",
  description: "Recharge une commande qui a été modifiée.",
  usage: "reload [command]"
}
