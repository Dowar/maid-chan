const { inspect } = require("util")
exports.run = async (client, message, [action, key, ...value], level) => 
{
  const settings = client.settings.get(message.guild.id)
  if (action === "add") 
  {
    if (!key) return message.reply("Veuillez spécifier une clé à ajouter")
    if (settings[key]) return message.reply("Cette clé existe déjà dans les paramètres")
    if (value.length < 1) return message.reply("Veuillez spécifier une valeur")

    settings[key] = value.join(" ")

    client.settings.set(message.guild.id, settings)
    message.reply(`${key} ajouté avec succès avec la valeur de ${value.join(" ")}`)
  } else
  
  if (action === "edit") 
  {
    if (!key) return message.reply("Veuillez spécifier une clé à modifier")
    if (!settings[key]) return message.reply("Cette clé n'existe pas dans les paramètres")
    if (value.length < 1) return message.reply("Veuillez spécifier une valeur")
  
    settings[key] = value.join(" ")

    client.settings.set(message.guild.id, settings)
    message.reply(`${key} édité avec succès à ${value.join(" ")}`)
  } else
  
  if (action === "del") 
  {
    if (!key) return message.reply("Veuillez spécifier une clé à supprimer")
    if (!settings[key]) return message.reply("Cette clé n'existe pas dans les paramètres")

    const response = await client.awaitReply(message, `Êtes-vous sûr de vouloir supprimer définitivement ${key}? Ça **ne peut pas** être annulé`)

    if (["y", "yes","oui","o"].includes(response)) 
    {
      delete settings[key]
      client.settings.set(message.guild.id, settings)
      message.reply(`${key} a été supprimé avec succès.`)
    } else
    if (["n","no","non","cancel"].includes(response)) {message.reply("Action annulée.")}
  } else
  
  if (action === "get") 
  {
    if (!key) return message.reply("Veuillez spécifier une clé à afficher")
    if (!settings[key]) return message.reply("Cette clé n'existe pas dans les paramètres")
    message.reply(`La valeur de ${key} est actuellement de ${settings[key]}`)
  } else {message.channel.send(inspect(settings), {code: "json"})}
}

exports.conf = 
{
  enabled: true,
  guildOnly: true,
  aliases: ["setting", "settings", "conf"],
  permLevel: "Admin"
}

exports.help = 
{
  name: "set",
  category: "Système",
  description: "Voir ou changer les paramètres du serveur.",
  usage: "set <view/get/edit> <clé> <valeur>"
}
