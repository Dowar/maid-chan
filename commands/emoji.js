exports.run = async (client, message, args, level) => 
{
  if(args[0])
  {
    var emoji = client.emojis.find("name", args[0]) || "🎉"
  }
  else
  {
    var emoji = message.guild.emojis.map(e=>e.toString()).join(" ")
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
