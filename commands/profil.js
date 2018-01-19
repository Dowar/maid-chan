//========================================================================================//
//  Commande - prefix + profil + mention(optionnel)
//========================================================================================//
const Jimp = require("jimp")                // Manipulateur d'image
const calcPercent = require("calc-percent") // Calcul de pourcentage
exports.run = (client, message, args, level, now, mentionned) => 
{
    const cible = mentionned || message.author        // Cibler l'utilisateur mentionné sinon l'auteur du message
    message.author.nickname = message.member.nickname // Récupération surnom serveur pour profil sans mention

    const nyas = client.nyas.get(cible.id) || { number: 0, timer: 0 }   // Chargement des nyas de la cible
    const calin = client.calin.get(cible.id) || { number: 0, timer: 0 } // Chargement des calin reçu de la cible
    const exp = client.exp.get(cible.id) || { exp: 0, lvl: 0 }          // Chargement des points d'xp de la cible
    const avatar = cible.avatarURL.toString().replace("2048", "256")    // Chargement de l'avatar de la cible

    // Liste d'image pour Jimp
    var images = ["background","layer1","layer2","exp1","exp2",avatar,"mask1","logo","box"]
    var jimps = []

    for (var i = 0; i < images.length; i++) // Chargement de la lise
    {
        if (images[i] === avatar) {jimps.push(Jimp.read(images[i]))}
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
        const p_nyas = nyas.number
        const p_calin = calin.number
        const p_lvl = "Lvl." + Math.floor(exp.lvl+1)
        const exp_now = Math.floor(exp.exp) - Math.floor(((exp.lvl)*(exp.lvl))*100)
        const exp_need = Math.floor(((exp.lvl+1)*(exp.lvl+1))*100) - Math.floor(((exp.lvl)*(exp.lvl))*100)
        const exp_size = calcPercent(exp_now,exp_need)

        //var p_exp = "XP: " + exp_size + "%"               // Mise en page texte xp - pourcentage
        var p_exp = "XP: " + exp_now + "/" + exp_need       // Mise en page texte xp - note
            const exp_align = " ".repeat(30 - p_exp.length) // Centrage texte xp
            p_exp = exp_align.concat(p_exp)
        
        data[4]
            .resize(exp_size*6, 42, Jimp.RESIZE_BICUBIC) // Redimension exp1 selon le pourcentage d'xp
 
        
        data[0] //Images
            .mask(data[6],0,0)              // masque1  - arrondi background
            .composite(data[1],0,0)         // layer1   - fond transparent
            .composite(data[2],0,0)         // layer2   - cadre avatar
            .composite(data[3],356,500)     // exp1     - fond barre exp
            .composite(data[4],376,506)     // exp2     - jauge exp
            .composite(data[5],52,226)      // avatar   - image de profil
            .composite(data[7],340,365)     // icone    - discord

        data[0] // Texte
            .print(font, 400, 355, p_pseudo)    // pseudo
            .print(font3, 405, 420, p_nickname) // surnom
            .print(font, 100, 500, p_lvl)       // niveau
            .print(font2, 434, 510, p_exp)      // xp


        if (cible.bot)
        {
            data[0] // Texte
            .composite(data[8],335,285)
            .print(font3, 353, 295, "BOT")
        }
        else if (cible.permLevel === 10)
        {
            data[0] // Texte
            .composite(data[8],335,285)
            .print(font3, 353, 295, "DEV")
        }
        //if(args[0] != "hd")
        //{data[0].resize(256, 256, Jimp.RESIZE_BICUBIC)}

        data[0] //Sauvegarde et envois
            .write(`data/profile/${cible.id}.png`, function() // Sauvegarde sous l'id de la cible
                {
                    client.logger.log("Image crée avec succès", "debug")
                    message.channel.send({file: `data/profile/${cible.id}.png`})
                })
            })
    })
    })
    })
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
  description: "Affiche le profil (Lvl,Xp,Nyas,Badges...) de la cible",
  usage: "profil <mention(optionnel)>"
}