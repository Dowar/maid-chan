exports.run = (client, message, args, level, command) =>
{
      if (args[0] === "add")
      {
            const djName  = "Donjon"
            async function createGuild(client, message)
            {
                  try 
                  {
                        const guild = await client.user.createGuild(djName, "london", "./images/maid_chan_background.png")
                        const defaultChannel = guild.channels.find(c=> c.permissionsFor(guild.me).has("SEND_MESSAGES"))
                        const invite = await defaultChannel.createInvite()
                        await message.channel.send(invite.url)
                        //const role = await guild.createRole({ name:"MJ", color:"YELLOW" })
                        const chan1 = await guild.createChannel("Level 0","text")
                        const chan2 = await guild.createChannel("Level 1","text")
                        const chan3 = await guild.createChannel("Level 2","text")
                        const chan4 = await guild.createChannel("cave","voice")
                  } catch (e) {console.error(e)}
            }
            createGuild(client, message)
                  .then(client.logger.log(`Maid-chan a cree l'instance : ${djName}`,"debug"))   
      }
      if (args[0] === "del")
      {
            message.guild.delete()
                  .then(g => client.logger.log(`Maid-chan a supprimer l'instance : ${g}`,"debug"))
                  .catch(console.error)
      }
}

exports.conf = 
{
  enabled: true,
  guildOnly: false,
  aliases: ["dj"],
  permLevel: "Deus"
}

exports.help = 
{
  name: "donjon",
  category: "RPG",
  description: "Ordonne à maid-chan de crée ou supprimer son serveur",
  usage: "donjon [add,del]"
}