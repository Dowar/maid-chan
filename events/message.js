//========================================================================================//
//  Dépendances
//========================================================================================//
const moment = require("moment") // Dépendance pour la Date
const talkedRecently = new Set() // Constante cooldown commande
//========================================================================================//
//  Evenement Message
//========================================================================================//
module.exports = (client, message) => 
{
  // Cooldown commande
  if (talkedRecently.has(message.author.id)) return                  // Ignorer si le cooldown n'est pas encore desactiver
  talkedRecently.add(message.author.id)                              // Active le cooldown et continue
  setTimeout(() => {talkedRecently.delete(message.author.id)}, 1000) // Desactive le cooldown au bout d'une seconde
  
  // Gestion Xp/Level
  client.pointsMonitor(client, message)

//========================================================================================//
//  Barrière anti Botception
//========================================================================================//
  if (message.author.bot) return

  // Variable date pour commande journalière
  if (moment().format("HH") == 23)             // Si il est 23H
  {
    var now = moment().format("YYYYMMDD")      // Date au format année+mois+jours (exemple: 20180110)
    now++                                      // Réglage UTC+1
  }    
  else {var now = moment().format("YYYYMMDD")} // Date au format année+mois+jours (exemple: 20180110)
  
  
  // Collection paramètre serveur
  const settings = message.guild            // Selectionne la guilde du message
    ? client.settings.get(message.guild.id) // Récupère les paramètres si ils existent
    : client.config.defaultSettings         // Sinon copier les paramètres par défaut
  message.settings = settings               // Ajout d'un raccourci vers les paramètres

  if (message.content.indexOf(settings.prefix) !== 0) return // Ignore le message si pas de prefix

  // Variables globales pour les commandes
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g)               // Récupere les arguments de la commande dans un tableau
  const command = args.shift().toLowerCase().sansAccent()                                      // Sépare la commande de ses arguments et la rend insensible a la casse
  const level = client.permlevel(message)                                                      // Récupere les permissions de l'auteur du message
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command)) // Récupere la commande/alias du message si elle existe
  const mentionned = message.mentions.users.first()                                            // Récupere l'utilisateur mentionné

  // Erreurs
  if (!cmd) return                                   // Ignorer si la commande n'existe pas
  if (cmd && !message.guild && cmd.conf.guildOnly)   // Erreur si la commande est utiliser par MP alors qu'elle est reservé aux canaux de guildes
  {return message.channel.send("Cette commande n'est pas utilisable par message privé !")}
  if (level < client.levelCache[cmd.conf.permLevel]) // Ignore si la permissions n'est pas suffisante
  {
    if (settings.systemNotice === "true") // Si le système de notice est activé dans les paramètres serveur
    {
      return message.channel.send(`Tu n'as pas les permissions requises pour utiliser cette commande.
      Votre niveau de permission est de ${level} (${client.config.permLevels.find(l => l.level === level).name})
      Cette commande requiert un niveau de ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`)
    } else {return}
  }

  // Raccourcis
  message.author.permLevel = level                                       // Ajout d'un raccourci vers les permissions
  if (message.guild) {message.author.nickname = message.member.nickname || message.author.username} // Récupération surnom serveur de l'auteur

  // Système de flag
  message.flags = []                          // Création d'un système de flags qui
  while (args[0] && args[0][0] === "-")       // récupère toutes les valeurs du tableau 
  {message.flags.push(args.shift().slice(1))} // d'arguments pour en simplifier l'usage

//========================================================================================//
//  Lancement de la commande
//========================================================================================//
  client.logger.cmd(`${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) lance la commande ${cmd.help.name}`)
  cmd.run(client, message, args, level, now, mentionned) // Déclenche et envois des variables aux commandes
}