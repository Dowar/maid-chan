const moment = require("moment")

module.exports = (client, message) => 
{
  if (message.author.bot) return // Anti Botception
  const now = moment().format("YYYYMMDD") // Date au format année+mois+jours (exemple: 20180110)
  const mentionned = message.mentions.users.first() // premier utilisateur mentionné
  client.pointsMonitor(client, message)

  const settings = message.guild //Récuperer les réglages du serveur
    ? client.settings.get(message.guild.id)
    : client.config.defaultSettings

  message.settings = settings
  if (message.content.indexOf(settings.prefix) !== 0) return // Ignorer si pas de prefix

  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g) // Récuperer les arguments de la commande dans un tableau
  const command = args.shift().toLowerCase().sansAccent() // Mettre le message en minuscule
  const level = client.permlevel(message) // Verifie les permissions de l'auteur du message
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command)) // on verifie si la commande/alias existe

  if (!cmd) return
  if (cmd && !message.guild && cmd.conf.guildOnly)
  {return message.channel.send("Cette commande n'est pas utilisable par message privé !")}

  if (level < client.levelCache[cmd.conf.permLevel]) // Si la permissions n'est pas suffisante
  {
    if (settings.systemNotice === "true") // et que la notice est activé dans les paramètres serveur
    {
      return message.channel.send(`tu n'a pas les permissions requise pour utiliser cette commande.
      Votre niveau de permission est de ${level} (${client.config.permLevels.find(l => l.level === level).name})
      Cette commande requiert un niveau de ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`)
    } else {return}
  }

  message.author.permLevel = level
  message.flags = []
  while (args[0] && args[0][0] === "-")
  {message.flags.push(args.shift().slice(1))}

  // Si la commande existe et que la permissions est suffisante, exécuter celle-ci
  client.logger.cmd(`${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) lance la commande ${cmd.help.name}`)
  cmd.run(client, message, args, level, now, mentionned)
}
