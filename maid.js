const config = require("./config.json");
const Discord = require("discord.js")
const client = new Discord.Client()
const http = require('http')
const fs = require("fs-extra")

let data = JSON.parse(fs.readFileSync("./data.json", "utf8"))
//let dataDialogue = JSON.parse(fs.readFileSync("./IA/dialogues.json", "utf8"))

var prefix = "!"
var id = "393547720935211008"
var tag = "Maid-chan#0518"
//========================================================================================//
//  Fonction pour le retrait des accents lors de la lecture du bot           
//========================================================================================//
String.prototype.sansAccent = function()
{
    var accent = 
    [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c']
    var str = this
    for(var i = 0; i < accent.length; i++)
    {
        str = str.replace(accent[i], noaccent[i])
    }
    return str
}
//========================================================================================//
//  Fonction pour récuperer les commandes via des fichier externes          
//========================================================================================//
fs.readdir("./commandes/", (err, files) => 
{
    if (err) return console.error(err)
    files.forEach(file => 
    {
        let eventFunction = require(`./commandes/${file}`)
        let eventName = file.split(".")[0]
        client.on(eventName, (...args) => eventFunction.run(client, ...args))
    })
})
fs.readdir("./IA/", (err, files) => 
{
    if (err) return console.error(err)
    files.forEach(file => 
    {
        let eventFunction = require(`./IA/dialogues.js`)
        let eventName = file.split(".")[0]
        client.on(eventName, (...args) => eventFunction.run(client, ...args))
    })
})
//========================================================================================//

client.on("ready", () =>
{
    client.user.setGame("Serveuse","https://www.twitch.tv/IA")
    //client.user.setAvatar("./Images/maid_chan_noel.png")

    //========================================================================================//
    //  Mise à jour de la base de donnée                            
    //========================================================================================//
    let utilisateur = client.users.map(u=> `${u.tag}`)
    var i = 0
    while(utilisateur[i])
    {
        if (!data[utilisateur[i]])
        {
            data[utilisateur[i]] = {}
        }
        if (!data[utilisateur[i]]["nyas"])
        {
            data[utilisateur[i]]["nyas"] = 
            {
                nombre: "0",
                timer: "0"
            } 
        }
        if (!data[utilisateur[i]]["calin"])
        {
            data[utilisateur[i]]["calin"] = 
            {
                nombre: "0",
                timer: "0"
            }
        }
        fs.writeFile("./data.json", JSON.stringify(data,"","\t"), (err) =>
        {
            if (err) console.error(err)
        })
        i++
    }
    console.log("Maid-chan mise a jour !")
    //========================================================================================//
})

client.on("message", message =>
{   
    if (message.author.bot) return;
    const mentionned = message.mentions.users.first()   //utilisateur mentionné
    //========================================================================================//
    //  Commandes - Communications avec les fichiers externes                                    
    //========================================================================================//
    if (message.content.startsWith(prefix))
    {
        const args = message.content.slice(prefix.length).trim().split(/ +/g)   //tableau avec tout les mots du message + suppresion prefix
        const commande = args.shift().toLowerCase().sansAccent()                //lecture de la commande
        try 
        {
            let commandFile = require(`./commandes/${commande}.js`)
            commandFile.run(client,fs,message,args,mentionned,data,commande,id,tag)
        } 
        catch (err) 
        {
            console.error(err)
        }
    }
    else //lecture pour l'IA
    {
        const dialogue = message.content.toLowerCase().sansAccent()  //lecture de la phrase
        try 
        {
            let commandFile = require(`./IA/dialogues.js`)
            commandFile.run(client,fs,message,mentionned,data,dialogue,id,tag)
        } 
        catch (err) 
        {
            console.error(err)
        }
    }
    //========================================================================================//
})
client.login(config.token) //Recuperation du TOKEN dans les variables environnement