//========================================================================================//
//  Commande - prefix + profil + mention(optionnel)
//========================================================================================//
exports.run = (client,fs,message,args,mentionned,data,commande,id,tag,author) => 
{
    if (!mentionned)
    {
        async function give() 
        {
            const messageInteractif = await message.channel.send("", 
            {
                embed: 
                {
                    color: 0xE15306,
                    title: "Profil de " + author.username,
                    description: author.tag,
                    fields: 
                    [
                        {
                            name: "**Nyas**",
                            value: ":euro: " + data[author.tag]["nyas"].nombre,
                            inline: true
                        }, 
                        {
                            name: "**Câlins reçu**",
                            value: ":hugging: " + data[author.tag]["calin"].nombre,
                            inline: false
                        },
                    ],
                    thumbnail: {url: author.avatarURL},
                    footer: {text: "🔽Boutons pour lancer la commande sur TOI"}
                }
            })
            await messageInteractif.react("💶")
            await messageInteractif.react("🤗")
            const collecteur = messageInteractif.createReactionCollector((reaction, user) => user.id != user.bot)
            collecteur.on("collect", async(reaction) => 
            {
                if (reaction.emoji.name === "💶")
                {
                    let commandFile = require(`./bonus.js`)
                    commandFile.run(client,fs,message,args,mentionned,data,commande,id,tag,author)
                }
                await reaction.remove(author.id)
            })
            collecteur.on("collect", async(reaction) => 
            {
                if (reaction.emoji.name === "🤗")
                {
                    let commandFile = require(`./calin.js`)
                    commandFile.run(client,fs,message,args,mentionned,data,commande,id,tag,author)
                }
                await reaction.remove(author.id)
            })
        }
        give()
    }
    else
    {
        async function give()
        {
            const messageInteractif = await message.channel.send("", 
            {
                embed: 
                {
                    color: 0xE15306,
                    title: "Profil de " + mentionned.username,
                    description: mentionned.tag,
                    fields: 
                    [
                        {
                            name: "**Nyas**",
                            value: ":euro: " + data[mentionned.tag]["nyas"].nombre,
                            inline: true
                        }, 
                        {
                            name: "**Câlins reçu**",
                            value: ":hugging: " + data[mentionned.tag]["calin"].nombre,
                            inline: false
                        },
                    ],
                    thumbnail: {url: mentionned.avatarURL},
                    footer: {text: "🔽Boutons pour lancer la commande sur TOI"}
                }
            })
            await messageInteractif.react("💶")
            await messageInteractif.react("🤗")
            const collecteur = messageInteractif.createReactionCollector((reaction, user) => user.id != user.bot)
            collecteur.on("collect", async(reaction) => 
            {
                if (reaction.emoji.name === "💶") 
                {
                    let commandFile = require(`./bonus.js`)
                    commandFile.run(client,fs,message,args,mentionned,data,commande,id,tag,author)
                }
                await reaction.remove(author.id)
            })
            collecteur.on("collect", async(reaction) => 
            {
                if (reaction.emoji.name === "🤗")
                {
                    let commandFile = require(`./calin.js`)
                    commandFile.run(client,fs,message,args,mentionned,data,commande,id,tag,author)
                }
                await reaction.remove(author.id)
            })
        }
        give()
    }
}