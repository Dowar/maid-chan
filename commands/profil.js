//========================================================================================//
//  Commande - prefix + profil + mention(optionnel)
//========================================================================================//
exports.run = async (client, message, args, level, now, mentionned) => 
{
    const nyas = client.nyas.get(message.author.id) || { number: 0, timer: 0 }
    const calin = client.calin.get(message.author.id) || { number: 0, timer: 0 }
    const exp = client.exp.get(message.author.id) || { exp: 0, lvl: 0 }

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
                        name: ":euro: **Nyas: **" + nyas.number,
                        value: ":hugging: Câlins reçus: " + calin.number,
                        inline: true
                    },
                    {
                        name: ":video_game: **Niveaux: **" + Math.floor(exp.lvl+1) ,
                        value: ":game_die: EXP: " + Math.floor(exp.exp) + "/" + Math.floor(((exp.lvl+1)*(exp.lvl+1))*100),
                        inline: true
                    }
                ],
                thumbnail: {url: message.author.avatarURL},
                footer: 
                {
                    icon_url: "",
                    text: "Maid-chan V0.4"
                }
            }
        })        
    }
    else
    {
        client.logger.log("Lanceur: "+ mentionned.username + "(" + mentionned.id + ")", "debug")

        const mnyas = client.nyas.get(mentionned.id) || { number: 0, timer: 0 }
        const mcalin = client.calin.get(mentionned.id) || { number: 0, timer: 0 }
        const mexp = client.exp.get(mentionned.id) || { exp: 0, lvl: 0 }

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
                        name: ":euro: **Nyas: **" + mnyas.number,
                        value: ":hugging: Câlins reçus: " + mcalin.number,
                        inline: true
                    },
                    {
                        name: ":video_game: **LEVEL: **" + Math.floor((mexp.lvl+1)),
                        value: ":game_die: EXP: " + Math.floor(mexp.exp) + "/" + Math.floor(((mexp.lvl+1)*(mexp.lvl+1))*100),
                        inline: true
                    }
                ],
                thumbnail: {url: mentionned.avatarURL},
                footer: 
                {
                    icon_url: "",
                    text: "Maid-chan V0.4"
                }
            }
        })
    }
}

exports.conf = 
{
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Utilisateur"
}

exports.help = 
{
  name: "profil",
  category: "RPG",
  description: "Affiche tout un tas d'information (Lvl,Xp,Nyas,Calin...) sur toi",
  usage: "profil [mention(optionnel)]"
}