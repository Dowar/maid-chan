exports.run = (client, message, args, level) => 
{
  if (!args[0]) 
  {
    const settings = message.guild ? client.settings.get(message.guild.id) : client.config.defaultSettings
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true)
    const commandNames = myCommands.keyArray()
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0)
    let currentCategory = ""
    let output = `= Liste des commandes =\n\n[Utilise ${settings.prefix}aide <NomDeLaCommande> pour plus de détail]\n`
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 )
    sorted.forEach( c => 
    {
      const cat = c.help.category.toProperCase()
      if (currentCategory !== cat) 
      {
        output += `\u200b\n== ${cat} ==\n`
        currentCategory = cat
      }
      output += `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`
    })
    message.channel.send(output, {code: "asciidoc"})
  } 
  else 
  {
    let command = args[0]
    if (client.commands.has(command))
    {
      command = client.commands.get(command)
      if (level < client.levelCache[command.conf.permLevel]) return
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nsyntaxe:: ${command.help.usage}\nalias:: ${command.conf.aliases.join(", ")}`, {code:"asciidoc"})
    }
  }
}

exports.conf = 
{
  enabled: true,
  guildOnly: false,
  aliases: ["h", "help"],
  permLevel: "Utilisateur"
}

exports.help = 
{
  name: "aide",
  category: "Divers",
  description: "Affiche toutes les commandes disponible pour votre niveau de permission.",
  usage: "aide <commande>"
}
