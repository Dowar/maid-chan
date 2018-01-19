module.exports = async client => 
{
  client.user.setActivity("son Maître",{url: "https://www.twitch.tv/IA", type: 2}) // Description du bot
  client.user.setAvatar("images/maid_chan.png") // Avatar du bot
  await client.wait(1000) // Attente que tout soit chargés
  client.logger.log(`${client.user.tag}, dispo pour ${client.users.size} joueurs sur ${client.guilds.size} serveurs.`, "pret")
  client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaultSettings)) // Chargement des configs par serveur
}