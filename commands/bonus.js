//========================================================================================//
//  Commande - prefix + bonus
//========================================================================================//
exports.run = async (client, message, args, level, now, mentionned) => 
{   
    const bonus = client.nyas.get(message.author.id) || { number: 0, timer: 0 }
   
    if (bonus.timer === now)
    {message.channel.send(":hourglass_flowing_sand: **"+ message.author.username + "** tu a déjà utilisé ton bonus de Nyas :euro: aujourd'hui !")}
    else
    {
        if (!mentionned || message.author.id === mentionned.id)
        {
            bonus.number =+ bonus.number+5
            bonus.timer = now
            message.channel.send("**" + message.author.username + "** récupère 5 Nyas :euro:")
            client.nyas.set(message.author.id, bonus)
        }
        else
        {
            const mbonus = client.nyas.get(mentionned.id) || { number: 0, timer: 0 }
            
            client.logger.log("Cible: "+ mentionned.username + "(" + mentionned.id + ")", "debug")
            mbonus.number =+ mbonus.number+5
            bonus.timer = now           
            message.channel.send("**" + message.author.username + "** offre 5 Nyas :euro: à **" + mentionned.username + "**")
            client.nyas.set(message.author.id, bonus)
            client.nyas.set(mentionned.id, mbonus)
        }
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
  name: "bonus",
  category: "RPG",
  description: "Permet de récupèrer ton bonus de nyas journalier",
  usage: "bonus [mention]"
}