exports.run = (client,fs,message,mentionned,data,dialogue,id,tag) =>
{
    async function help() {
        var i = 0
        const messageInteractif = await message.channel.send(`${i}`)
        await messageInteractif.react("➕")
        const collecteur = messageInteractif.createReactionCollector((reaction, user) => user.id === message.author.id)
        collecteur.on('collect', async(reaction) => 
        {
            if (reaction.emoji.name === "➕") 
            {
                i++
                messageInteractif.edit(`${i}`)
            }
          await reaction.remove(message.author.id)
        })
     }
     help()
}