//========================================================================================//
//  Commande - prefix + profil + mention(optionnel)
//========================================================================================//
exports.run = (client ,fs , message, args, mentionned, data, commande, id, tag) => 
{
    if (!mentionned)
    {
        message.channel.send("", 
        {
            embed: 
            {
                color: 0xE15306,
                title: "Profil de " + message.author.username,
                description: message.author.tag,
                fields: 
                [
                    {
                        name: "**Nyas**",
                        value: data[message.author.tag]["nyas"].nombre,
                        inline: true
                    }, 
                    {
                        name: "**Câlins reçu**",
                        value: data[message.author.tag]["calin"].nombre,
                        inline: false
                    },
                ],
                thumbnail: 
                {
                    url: message.author.avatarURL
                },
                timestamp: new Date(),
                footer: 
                {
                    text: "Maid-chan V0.1",
                }
            }
        })
    }
    else
    {
        message.channel.send("", 
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
                        value: data[mentionned.tag]["nyas"].nombre,
                        inline: true
                    }, 
                    {
                        name: "**Câlins reçu**",
                        value: data[mentionned.tag]["calin"].nombre,
                        inline: false
                    },
                ],
                thumbnail: 
                {
                    url: mentionned.avatarURL
                },
                timestamp: new Date(),
                footer: 
                {
                    text: "Maid-chan V0.1",
                }
            }
        })
    }
}