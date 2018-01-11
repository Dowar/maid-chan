module.exports = (client, guild) => 
{
  client.settings.delete(guild.id) // Suppression des configs du serveur
}
