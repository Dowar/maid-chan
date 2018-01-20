//========================================================================================//
//  Afficher Ping
//========================================================================================//
exports.run = async (client, message, args, level) => 
{
  const msg = await message.channel.send("Ping?")
  msg.edit(`Pong! Latence: ${msg.createdTimestamp - message.createdTimestamp}ms. Latence de l'API: ${Math.round(client.ping)}ms`)
}
//========================================================================================//
//  Config
//========================================================================================//
exports.conf = 
{
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Utilisateur"
}
//========================================================================================//
//  Aide
//========================================================================================//
exports.help = 
{
  name: "ping",
  category: "Divers",
  description: "Affiche la latence du bot.",
  usage: "ping"
}
