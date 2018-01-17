exports.run = async (client, message, [...emojis], level) => 
{
  if(emojis)
  {
    emojis.forEach(function(select) {emoji.push(client.emojis.find("name", select) || "🎉")})
  }
  else
  {
    var emoji = client.emojis.map(e=>e.toString()).join(" ") // Récupere tout les emojis custom auquel le bot a accès
  }
  message.delete()
  message.channel.send(`${emoji}`)
}



exports.conf = 
{
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Deus"
}

exports.help = 
{
  name: "emoji",
  category: "Système",
  description: "Affiche l'emoji custom nommé, sinon affiche tous les emojis custom disponible",
  usage: "emoji <nom>"
}
