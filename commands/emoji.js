exports.run = async (client, message, args, level) => 
{
      const wumpus = client.emojis.find("name", "wumpus") || "🎉"
      message.delete()
      message.channel.send(`${wumpus}`)
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
