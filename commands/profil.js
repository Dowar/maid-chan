//========================================================================================//
//  Dépendances
//========================================================================================//
const Jimp = require("jimp")                // Manipulateur d'image
const calcPercent = require("calc-percent") // Calcul de pourcentage
//========================================================================================//
//  Profil RPG
//========================================================================================//
exports.run = async(client, message, args, level, now, mentionned) =>
{
    message.channel.startTyping() // Simule debut tappage clavier

    // Variables textes
    const cible = mentionned || message.author                                  // Cibler l'utilisateur mentionné sinon l'auteur du message
    message.author.nickname = message.member.nickname                           // Récupération surnom serveur pour profil sans mention
    const nyas = client.nyas.get(cible.id) || { number: 0, timer: 0 }           // Chargement des nyas
    const calin = client.calin.get(cible.id) || { number: 0, timer: 0 }         // Chargement des calin reçu
    const exp = client.exp.get(cible.id) || { exp: 0, lvl: 0 }                  // Chargement des points d'xp

    // Variables images
    const avatar = cible.avatarURL.toString().replace("2048", "512")            // Chargement de l'avatar
    const servicon = message.guild.iconURL.toString().replace(".jpg", ".png")   // Chargement de l'icone du serveur
    const badges_slots = [0,0,0,0,0,0,0,0,0,0,0,0]                              // Chargement des badges dans leurs slots
    const badges_level = [0,0,0,0,0,0,0,0,0,0,0,0]                              // Chargement des niveaux des badges
    //const background = cible.avatarURL.toString().replace("2048", "1024")     // Chargement de l'avatar de la cible pour le background ||TEST||

    // Chargement d'image pour Jimp
    var images = ["background","mask1","layer1","exp","mask2","mask3",avatar,"mask4","logo","box",servicon,"mask5"]
    var jimps = []

    for (var i = 0; i < images.length; i++) // Chargement de la lise
    {
        if (images[i] === avatar || images[i] === servicon) {jimps.push(Jimp.read(images[i]))}
        else {jimps.push(Jimp.read("profile/" + images[i] + ".png"))}
    }

    Promise.all(jimps) // Promesse
    .then(function(data)         
    {return Promise.all(jimps)})
    .then(function(data) 
    {
    Jimp.loadFont(Jimp.FONT_SANS_64_WHITE) // Chargement police
    .then(function(font)
    {
    Jimp.loadFont(Jimp.FONT_SANS_32_BLACK) // Chargement police 2
    .then(function(font2)
    {
    Jimp.loadFont(Jimp.FONT_SANS_32_WHITE) // Chargement police 3
    .then(function(font3)
    {
        // Recuperation et conversion des données de la cible
        const p_pseudo = cible.username
        const p_nickname = cible.nickname || " "
        const p_nyas = nyas.number.toString()
        const p_calin = calin.number.toString()
        const p_lvl = "Lvl." + Math.floor(exp.lvl+1)
        const exp_now = Math.floor(exp.exp) - Math.floor(((exp.lvl)*(exp.lvl))*100)
        const exp_need = Math.floor(((exp.lvl+1)*(exp.lvl+1))*100) - Math.floor(((exp.lvl)*(exp.lvl))*100)
        const exp_size = calcPercent(exp_now,exp_need)

        var p_exp = "XP: " + exp_size + "%"               // Mise en page texte xp - pourcentage
        //var p_exp = "XP: " + exp_now + "/" + exp_need     // Mise en page texte xp - note
            const exp_align = " ".repeat(30 - p_exp.length) // Centrage texte xp
            p_exp = exp_align.concat(p_exp)
        
        data[3] //Images
            .resize(exp_size*6, 58, Jimp.RESIZE_BICUBIC)    // Redimension exp selon le pourcentage d'xp
            .mask(data[4],0,0)                              // mask2    - arrondi debut barre xp
            .mask(data[5],(exp_size*6)-10,0)                // mask3    - arrondi fin barre xp

        data[6] //Images
            .resize(314, 314, Jimp.RESIZE_BICUBIC)
            .mask(data[7],0,0)              // mask4    - arrondi avatar

        data[10] //Images
            .resize(50, 50, Jimp.RESIZE_BICUBIC)
            .mask(data[11],0,0)             // mask5    - arrondi serveur icone
        
        data[0] //Images
            .mask(data[1],0,0)               // mask1    - arrondi background
            .composite(data[2],0,0)          // layer1   - fond transparent
            .composite(data[3],390,490)      // exp      - barre exp
            .composite(data[6],39,214)       // avatar   - image de profil
            .composite(data[8],375,365)      // icone    - logo discord
            .composite(data[10],375,415)     // icone    - logo serveur
            //.composite(data[12],679,575)     // badge1   - test

        data[0] // Texte
            .print(font, 435, 355, p_pseudo)            // pseudo
            .print(font3, 440, 420, p_nickname)         // surnom
            .print(font, 60, 625, p_lvl)                // niveau
            .print(font2, 434, 500, p_exp)              // xp
            .print(font2, 275, 635, "Nyas :")           // nyas texte
            .print(font2, 580, 635, p_nyas)             // nyas valeur
            .print(font2, 275, 665, "Calins Reçus :")   // calin texte
            .print(font2, 580, 665, p_calin)            // calin valeur
            .print(font2, 365, 568, "Statistiques")     // stats
            .print(font2, 265, 778, "Description")      // description

        if (cible.bot)
        {
            data[0] // Texte
            .composite(data[9],385,285)
            .print(font3, 403, 295, "BOT")
        }
        else if (cible.permLevel === 10)
        {
            data[0] // Texte
            .composite(data[9],385,285)
            .print(font3, 403, 295, "DEV")
        }

        data[0]
            .resize(1024, 1024, Jimp.RESIZE_BICUBIC)

        data[0] //Sauvegarde et envois
            .write(`data/profile/${cible.id}.png`, function() // Sauvegarde sous l'id de la cible
                {
                    async function envois()
                    {
                        await client.logger.log("Image crée avec succès", "debug")
                        await message.channel.send({file: `data/profile/${cible.id}.png`}) // Envois image de profil
                        await client.logger.log("Image envoyée avec succès", "debug")
                        await message.channel.stopTyping() // Simule fin tappage clavier
                    }
                    envois()
                })
            })
    })
    })
    })
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
  name: "profil",
  category: "RPG",
  description: "Affiche le profil (Lvl,Xp,Nyas,Badges...) de la cible",
  usage: "profil <mention(optionnel)>"
}