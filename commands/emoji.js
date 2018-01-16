exports.run = async (client, message, args, level) => 
{
      const name = args[0]
      const emoji = client.emojis.find("name", name) || "🎉"
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
