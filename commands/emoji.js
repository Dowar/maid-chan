//========================================================================================//
// Afficher Emoji / Texte
//========================================================================================//
exports.run = async (client, message, [...emojis], level) => 
{
  if(emojis.length)
  {
    emoji = []
    emojis.forEach(function(select) {emoji.push(client.emojis.find("name", select) || select + " ")}) // Récupere dans un tableau tout les arguments
    emoji = emoji.join('')                                                                            // Et les convertis en emoji si possible
  }
  else
  {
    var emoji = client.emojis.map(e=>e.toString()).join(" ") // Récupere dans un tableau tout les emojis custom accesible
  }
  message.delete()
  message.channel.send(`${emoji}`)
}
//========================================================================================//
//  Config
//========================================================================================//
exports.conf = 
{
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Deus"
}
//========================================================================================//
//  Aide
//========================================================================================//
exports.help = 
{
  name: "emoji",
  category: "Système",
  description: "Affiche l'emoji custom nommé, sinon affiche tous les emojis custom disponible",
  usage: "emoji <nom>"
}
