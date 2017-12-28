const config = require("./config.json");
const Discord = require("discord.js")
const client = new Discord.Client()
const http = require('http')
const fs = require("fs-extra")

let data = JSON.parse(fs.readFileSync("./data.json", "utf8"))

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
    const mentionned = message.mentions.users.first()             //utilisateur mentionné
    const dialogue =  message.content.toLowerCase().sansAccent()  //lecture de la phrase

    //========================================================================================//
    //  Commandes - Communications avec les fichiers externes                                    
    //========================================================================================//
    if (message.content.startsWith("!"))
    {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);  //tableau avec tout les mots du message + suppresion prefix
        const commande = args.shift().toLowerCase().sansAccent()                //lecture de la commande
        try 
        {
            let commandFile = require(`./commandes/${commande}.js`)
            commandFile.run(client ,fs , message, args, mentionned, data, commande, id, tag)
        } 
        catch (err) 
        {
            console.error(err)
        }
    }
    //========================================================================================//
    //  Dialogue - Dictionnaire                                     
    //========================================================================================//
    var salut = ["salut ","bonjour ","yo ","coucou ","hola ","hi ","もしもし ","привет ","buongiorno ","Konnichiwa ","你好 ","buenos dias ","ciao ","صباح الخير ","안녕하세요 "]
    var cava = ["sa va","ca va"]
    var malpoli = [" bite","chibre","penis","phallus","zizi"]
    var maidchan = ["maidchan","maid-chan","maid","tout le monde","les gens"]
    //========================================================================================//
    //  Dialogue - Salut                                      
    //========================================================================================//
    if (salut.some(mots => dialogue.includes(mots))&&maidchan.some(mots => dialogue.includes(mots)))
    {
        if (message.author.id !== id)
        {
            var r = Math.floor((Math.random()*10))
            if(r<=4)
            {
                message.channel.send("Salut " + message.author.username + " !")
            }
            if(r>=5)
            {
                message.channel.send("Bonjour " + message.author.username + " !")
            }
        }
    }
    //========================================================================================//
    //  Dialogue - ça va ?                                      
    //========================================================================================//
    if (cava.some(mots => dialogue.includes(mots))&&maidchan.some(mots => dialogue.includes(mots)))
    {
        if (message.author.id !== id)
        {
            var r = Math.floor((Math.random()*10))
            if(r<=4)
            {
                message.channel.send("ça va !")
            }
            if(r>=5)
            {
                message.channel.send("ça va bien !")
            }
        }
    }
    //========================================================================================//
    //  Dialogue - Censure                                      
    //========================================================================================//
    if (malpoli.some(mots => dialogue.includes(mots)))
    {
        if (message.author.id !== id)
        {
            var r = Math.floor((Math.random()*10))
            if(r<=3)
            {
                message.channel.send("Malpoli !")
            }
            if(r>=4&&r<8)
            {
                message.channel.send("Malotru !")
            }
            if(r>=9)
            {
                message.channel.send("Goujat !")
            }
        }
        message.delete()
    }
    //========================================================================================//
    //  Dialogue - Joyeux noel                                     
    //========================================================================================//
    if (dialogue.startsWith("joyeux noel")||dialogue.startsWith("noyeux joel"))
    {
        if (message.author.id !== id)
        {
            var r = Math.floor((Math.random()*10))
            if(r<=4)
            {
                message.channel.send("Joyeux Noël " + message.author.username + " !",
                {
                    files: 
                    [
                      "./images/noel_1.png"
                    ]
                })
            }
            if(r>=5)
            {
                message.channel.send("Joyeux Noël " + message.author.username + " !",
                {
                    files: 
                    [
                      "./images/noel_2.png"
                    ]
                })
            }
        }
    }
    //========================================================================================//
})
client.login(config.token) //Recuperation du TOKEN dans les variables environnement