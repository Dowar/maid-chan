exports.run = (client, message, args, level) =>
{
      const djName  = "Donjon"
      async function createGuild(client, message)
      {
            try 
            {
                  const guild = await client.user.createGuild(djName, 'london')
                  const defaultChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"))
                  const invite = await defaultChannel.createInvite()
                  await message.channel.send(invite.url)
                  const role = await guild.createRole({ name:'Admin', permissions:['ADMINISTRATOR'] })
            } catch (e) {console.error(e)}
      }
      createGuild(client, message).then(client.logger.log(`Maid-chan a cree l'instance : ${djName}`,"debug"))
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
  name: "dj_add",
  category: "RPG",
  description: "Ordonne à maid-chan de crée un serveur",
  usage: "donjon"
}