//========================================================================================//
//  Calin journalier
//========================================================================================//
exports.run = async (client, message, args, level, now, mentionned) => 
{
    // Variables
    const cible = mentionned || message.author                                    // Cibler l'utilisateur mentionné sinon l'auteur du message
    const nickname = cible.nickname || cible.username                             // Utilise le surnom serveur de la cible sinon son pseudo
    const calin = client.calin.get(message.author.id) || { number: 0, timer: 0 }  // Chargement des données de l'auteur
    const maidcalin = client.calin.get(client.user.id) || { number: 0, timer: 0 } // Chargement des données du bot

    if (!mentionned)
    {
        if (maidcalin.timer == now) // Ignorer si la commande a déja été lancer aujourd'hui
        {message.channel.send(`:hourglass_flowing_sand: Désolé j'ai déjà atteint mon quota de calin :hugging: aujourd'hui !`)}
        else
        {
            client.logger.log(`Lanceur: ${client.user.username} (${client.user.id})`, "debug")
            message.channel.send("Tu n'a personne pour te faire un câlin ?")
            message.channel.send(`**${client.user.username}** fait un câlin virtuel :hugging: à **${cible.username}**`)
            calin.number++
            maidcalin.timer = now
            client.calin.set(cible.id, calin)
            client.calin.set(client.user.id, maidcalin)
        }
    }
    else if (!mentionned || message.author === mentionned) {message.channel.send("*mais personne n'est venu")}
    else
    {
        const mcalin = client.calin.get(cible.id) || { number: 0, timer: 0 }

        if (calin.timer == now) // Ignorer si la commande a déja été lancer aujourd'hui
        {message.channel.send(`:hourglass_flowing_sand: **${message.author.nickname}** tu a déjà câliner :hugging: quelqu'un aujourd'hui !`)}
        else
        {
            mcalin.number++
            calin.timer = now
            client.calin.set(message.author.id, calin)
            client.calin.set(cible.id, mcalin)
            message.channel.send(`**${message.author.nickname}** fait un câlin virtuel :hugging: à **${cible.nickname}**`)
            client.logger.log(`Cible: ${cible.username} (${cible.id})`, "debug")
        }
    }
}
//========================================================================================//
//  Config
//========================================================================================//
exports.conf = 
{
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Utilisateur"
}
//========================================================================================//
//  Aide
//========================================================================================//
exports.help = 
{
  name: "calin",
  category: "RPG",
  description: "Permet de faire un calin journalier à la personne de ton choix",
  usage: "calin [mention]"
}