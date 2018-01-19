const moment = require("moment") // Dépendance pour la Date
const talkedRecently = new Set() // Constante cooldown commande
module.exports = (client, message) => 
{
  if (talkedRecently.has(message.author.id)) return                  // Cooldown commande
  talkedRecently.add(message.author.id)                              // Application cooldown a l'auteur
  setTimeout(() => {talkedRecently.delete(message.author.id)}, 1000) // Reinitialisation cooldown
  client.pointsMonitor(client, message)             // Lancement du système d'EXP / LEVEL UP
  if (message.author.bot) return                    // Anti Botception
  var now = moment().format("YYYYMMDD")             // Récupere la date au format année+mois+jours (exemple: 20180110)
  if (moment().format("HH") == 23) {now++}          // Réglage UTC+1
  else {const now = moment().format("YYYYMMDD")}    // Réglage UTC+1
  const mentionned = message.mentions.users.first() // Récupere l'utilisateur mentionné

  const settings = message.guild            // Récupère l'objet serveur
    ? client.settings.get(message.guild.id) // Récupère les paramètres si ils existent
    : client.config.defaultSettings         // Sinon copier les paramètres par défaut

  message.settings = settings
  if (message.content.indexOf(settings.prefix) !== 0) return // Ignore le message si pas de prefix

  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g)               // Récupere les arguments de la commande dans un tableau
  const command = args.shift().toLowerCase().sansAccent()                                      // Sépare la commande de ses arguments et la rend insensible a la casse
  const level = client.permlevel(message)                                                      // Récupere les permissions de l'auteur du message
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command)) // Récupere la commande/alias si elle existe

  if (!cmd) return                                 // Ignorer si la commande n'existe pas
  if (cmd && !message.guild && cmd.conf.guildOnly) // Erreur si la commande est utiliser par MP alors qu'elle est reservé aux canaux de guildes
  {return message.channel.send("Cette commande n'est pas utilisable par message privé !")}

  if (level < client.levelCache[cmd.conf.permLevel]) // Ignore si la permissions n'est pas suffisante
  {
    if (settings.systemNotice === "true") // Si le système de notice est activé dans les paramètres serveur
    {
      return message.channel.send(`tu n'a pas les permissions requise pour utiliser cette commande.
      Votre niveau de permission est de ${level} (${client.config.permLevels.find(l => l.level === level).name})
      Cette commande requiert un niveau de ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`)
    } else {return}
  }

  message.author.permLevel = level
  message.flags = []                          // Création d'un système de flags qui
  while (args[0] && args[0][0] === "-")       // récupère toutes les valeurs du tableau 
  {message.flags.push(args.shift().slice(1))} // d'arguments pour en simplifier l'usage

  client.logger.cmd(`${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) lance la commande ${cmd.help.name}`)
  cmd.run(client, message, args, level, now, mentionned) // Déclenche et envois des variables aux commandes
}