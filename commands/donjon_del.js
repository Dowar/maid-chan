exports.run = async (client, message, args, level) =>
{
    let guild = message.guild
    guild.delete()
      .then(g => client.logger.log(`Maid-chan a supprimer l'instance : ${g}`,"debug"))
      .catch(console.error)
}

exports.conf = 
{
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Deus"
}

exports.help = 
{
  name: "dj_del",
  category: "Divers",
  description: "Ordonne à maid-chan de supprimer son serveur",
  usage: "supprimer"
}