exports.run = async (client, message) => 
{
  const scoreLevel = client.points.get(message.author.id).level
  !scoreLevel ? message.channel.send('Tu n\'a pas encore de niveau.') : message.channel.send(`Tu est actuellement niveau ${scoreLevel}!`)
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
  name: "level",
  category: "RPG",
  description: "Montre ton niveau",
  usage: "level"
}