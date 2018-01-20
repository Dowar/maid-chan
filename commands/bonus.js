//========================================================================================//
//  Bonus journalier
//========================================================================================//
exports.run = (client, message, args, level, now, mentionned) => 
{   
    // Variables
    const cible = mentionned || message.author                                  // Cibler l'utilisateur mentionné sinon l'auteur du message
    const nickname = cible.nickname || cible.username                           // Utilise le surnom serveur de la cible sinon son pseudo
    const bonus = client.nyas.get(message.author.id) || { number: 0, timer: 0 } // Chargement des données de l'auteur

    if (bonus.timer == now) // Ignorer si la commande a déja été lancer aujourd'hui
    {message.channel.send(`:hourglass_flowing_sand: **${nickname}**, tu a déjà utilisé ton bonus de Nyas :euro: aujourd'hui !`)}
    else
    {
        if (!mentionned || message.author === mentionned)
        {
            bonus.number = bonus.number+5                                  // Ajout des nyas a la cible
            bonus.timer = now                                              // Enregistre la date du lancement de la commande
            message.channel.send(`**${nickname}** récupère 5 Nyas :euro:`) // Message annonce
            client.nyas.set(cible.id, bonus)                               // Enregistre dans la base de données persistante
        }
        else
        {
            const mbonus = client.nyas.get(cible.id) || { number: 0, timer: 0 } // Chargement des données de la cible
            
            mbonus.number = mbonus.number+5
            bonus.timer = now
            message.channel.send(`**${message.author.nickname}** offre 5 Nyas :euro: à **${nickname}**`)
            client.nyas.set(message.author.id, bonus)
            client.nyas.set(cible.id, mbonus)
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
  name: "bonus",
  category: "RPG",
  description: "Permet de récupèrer ton bonus de nyas journalier",
  usage: "bonus <mention(optionnel)>"
}