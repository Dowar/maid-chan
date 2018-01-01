//========================================================================================//
//  Commande - prefix + profil + mention(optionnel)
//========================================================================================//
exports.run = (client,fs,message,args,mentionned,data,commande,id,tag,author) => 
{
    if (!mentionned)
    {
        message.channel.send("", 
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
                footer: 
                {
                    icon_url: "",
                    text: "Maid-chan V0.3"
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
                footer: 
                {
                    icon_url: "",
                    text: "Maid-chan V0.3"
                }
            }
        })   
    }
}