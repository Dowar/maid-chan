//========================================================================================//
//  Calin journalier
//========================================================================================//
exports.run = async (client, message, args, level, now, mentionned) => 
{
    const calin = client.calin.get(message.author.id) || { number: 0, timer: 0 }
    const maidcalin = client.calin.get(client.user.id) || { number: 0, timer: 0 }

    if (!mentionned)
    {
        if (maidcalin.timer === now)
        {message.channel.send(":hourglass_flowing_sand: Désolé j'ai déjà atteint mon quota de calin :hugging: aujourd'hui !")}
        else
        {
            client.logger.log("Lanceur: "+ client.user.username + "(" + client.user.id + ")", "debug")
            message.channel.send("Tu n'a personne pour te faire un câlin ?")
            message.channel.send("**Maid-chan** fait un câlin virtuel :hugging: à **" + message.author.username + "**")
            calin.number++
            maidcalin.timer = now
            client.calin.set(message.author.id, calin)
            client.calin.set(client.user.id, maidcalin)
        }
    }
    else if (!mentionned || message.author.id === mentionned.id)
    {message.channel.send("*mais personne n'est venu")}
    else
    {
        const mcalin = client.calin.get(mentionned.id) || { number: 0, timer: 0 }

        if (calin.timer === now)
        {message.channel.send(":hourglass_flowing_sand: **" + message.author.username + "** tu a déjà câliner :hugging: quelqu'un aujourd'hui !")}
        else
        {
            client.logger.log("Cible: "+ mentionned.username + "(" + mentionned.id + ")", "debug")
            mcalin.number++
            calin.timer = now
            client.calin.set(message.author.id, calin)
            client.calin.set(mentionned.id, mcalin)
            message.channel.send("**" + message.author.username + "** fait un câlin virtuel :hugging: à **" + mentionned.username + "**")
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
  name: "calin",
  category: "RPG",
  description: "Permet de faire un calin journalier à la personne de ton choix",
  usage: "calin [mention]"
}