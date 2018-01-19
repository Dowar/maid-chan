//========================================================================================//
//  Affichage Permissions
//========================================================================================//
exports.run = async (client, message, args, level) => 
{
  const friendly = client.config.permLevels.find(l => l.level === level).name
  message.reply(`Votre niveau de permissions est de ${level} - ${friendly}`)
}

exports.conf = 
{
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Utilisateur"
}

exports.help = 
{
  name: "perm",
  category: "Divers",
  description: "Affiche votre niveau de permission sur ce serveur.",
  usage: "perm"
}
