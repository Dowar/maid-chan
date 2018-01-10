module.exports = async client => 
{
  client.user.setGame("Serveuse","https://www.twitch.tv/IA")
  //client.user.setAvatar("./Images/maid_chan_noel.png")
  await client.wait(1000)
  client.logger.log(`${client.user.tag}, dispo pour ${client.users.size} joueurs sur ${client.guilds.size} serveurs.`, "pret")
  client.guilds.filter(g => !client.settings.has(g.id)).forEach(g => client.settings.set(g.id, client.config.defaultSettings))
}