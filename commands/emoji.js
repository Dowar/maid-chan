exports.run = async (client, message, args, level) => 
{
  if(args[0])
  {
    var emoji = client.emojis.find("name", args[0]) || "🎉"
  }
  else
  {
    var emoji = client.emojis.map(e=>e.toString()).join(" ") // Récupere toutes les emojis custom auquel il a accès
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
  category: "Nitro",
  description: "Haha !",
  usage: "emoji"
}
