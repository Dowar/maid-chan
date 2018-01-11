module.exports = async client => 
{
  client.user.setGame("Serveuse","https://www.twitch.tv/IA") // Description du bot
  //client.user.setAvatar("./Images/maid_chan_noel.png")     // Avatar du bot
  await client.wait(1000)                                    // Attente que tout soit chargés
  client.logger.log(`${client.user.tag}, dispo pour ${client.users.size} joueurs sur ${client.guilds.size} serveurs.`, "pret")
  client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaultSettings)) // Chargement des configs par serveur
}