exports.run = async (client, message) => 
{
  const scorePoints = client.points.get(message.author.id).points
  !scorePoints ? message.channel.send('Tu n\'a pas de point.') : message.channel.send(`Tu a ${scorePoints} points!`);
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
  name: "points",
  category: "RPG",
  description: "Montre tes XP",
  usage: "points"
}