exports.run = async (client, message, args, level) => 
{
  const msg = await message.channel.send("Ping?")
  msg.edit(`Pong! Latence: ${msg.createdTimestamp - message.createdTimestamp}ms. Latence de l'API: ${Math.round(client.ping)}ms`)
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
  name: "ping",
  category: "Divers",
  description: "Teste la latence du bot.",
  usage: "ping"
}
