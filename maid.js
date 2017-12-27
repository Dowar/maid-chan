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

client.on("ready", () =>
{
    console.log("Maid-chan mise a jour !")
    console.log(Date.now())
    
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
    //========================================================================================//
})

client.on("message", message =>
{
    var msgc = message.content.toLowerCase().sansAccent()
    //console.log(msgc)

    //========================================================================================//
    //  Dialogue - Dictionnaire                                     
    //========================================================================================//
    var salut = ["salut ","bonjour ","yo ","coucou ","hola ","hi ","もしもし ","привет ","buongiorno ","Konnichiwa ","你好 ","buenos dias ","ciao ","صباح الخير ","안녕하세요 "]
    var malpoli = [" bite","chibre","penis","phallus","zizi"]
    var maidchan = ["maidchan","maid-chan","maid"]
    //========================================================================================//
    //  Dialogue - Salut                                      
    //========================================================================================//
    if (salut.some(mots => msgc.includes(mots))&&maidchan.some(mots => msgc.includes(mots)))
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
    //  Dialogue - Censure                                      
    //========================================================================================//
    if (malpoli.some(mots => msgc.includes(mots)))
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
    if (msgc.startsWith("joyeux noel")||msgc.startsWith("noyeux joel"))
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
        return
    }
    //========================================================================================//
    //  Commande - prefix + profil                                   
    //========================================================================================//
    if (msgc.startsWith(prefix + "profil")) 
    {
        message.channel.send("", 
        {
            embed: 
            {
                color: 0xE15306,
                author:  message.author.name,
                title: "Profil de " + message.author.username,
                description: message.author.tag,
                fields: 
                [
                    {
                        name: "**Nyas**",
                        value: data[message.author.tag]["nyas"].nombre,
                        inline: true
                    }, 
                    {
                        name: "**Câlins reçu**",
                        value: data[message.author.tag]["calin"].nombre,
                        inline: false
                    },
                ],
                thumbnail: 
                {
                    url: message.author.avatarURL
                },
                timestamp: new Date(),
                footer: 
                {
                    text: "Maid-chan V0.1",
                }
            }
        })
    }
    //========================================================================================//
    //  Commande - prefix + calin                                      
    //========================================================================================//
    if (msgc.startsWith(prefix + "calin"))
    {
        var mentionned = message.mentions.users.first()

        if (!mentionned) 
        {
            if ((data[tag]["calin"].timer > Date.now()))
            {
            message.channel.send("désolé j'ai déjà atteint mon quota de calin aujourd'hui !")
            }
            else
            {
                message.channel.send("Tu n'a personne pour te faire un câlin ?")
                message.channel.send("**Maid-chan** fait un câlin virtuel:hugging: à **" + message.author.username + "**")
                data[tag]["calin"].timer = Date.now() + 43200000 //43200000 = 12h en millisecondes
                data[message.author.tag]["calin"].nombre++
                fs.writeFile("./data.json", JSON.stringify(data,"","\t"), (err) =>
                {
                    if (err) console.error(err)
                });
            }
        }
        else if (mentionned == message.author)
        {
            message.channel.send("*mais personne n'est venu")
        }
        else
        {
            if ((data[message.author.tag]["calin"].timer > Date.now()))
            {
                var now = new Date().getTime()
                var distance = data[message.author.tag]["calin"].timer - now
                var heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                message.channel.send(message.author.username + 
                " tu a déjà câliner quelqu'un aujourd'hui, réesayer dans " + heures + "H" + minutes + ":hourglass_flowing_sand: ")
            }
            else
            {
                if ((!mentionned||mentionned == message.author))
                {
                    data[mentionned.tag]["calin"].nombre++
                    data[message.author.tag]["calin"].timer = Date.now() + 43200000 //43200000 = 12h en millisecondes
                    fs.writeFile("./data.json", JSON.stringify(data,"","\t"), (err) => 
                    {
                        if (err) console.error(err)
                    });
                    message.channel.send("**" + message.author.username + "** fait un câlin virtuel:hugging: à **" + mentionned.username + "**")
                }
            }
        }
    }
    //========================================================================================//
    //  Commande - prefix + bonus
    //========================================================================================//
    if (msgc.startsWith(prefix + "bonus"))
    {
        var mentionned = message.mentions.users.first()
        if ((data[message.author.tag]["nyas"].timer > Date.now()))
        {
            var now = new Date().getTime()
            var distance = data[message.author.tag]["nyas"].timer - now;
            var heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            message.channel.send(message.author.username + 
            " tu a déjà utilisé ton bonus de Nyas:moneybag: aujourd'hui, réessaye dans " + heures + "h" + minutes + ":hourglass_flowing_sand: ")
        }
        else 
        {
            if (!mentionned || mentionned == message.author)
            {
                data[message.author.tag]["nyas"].nombre =+ data[message.author.tag]["nyas"].nombre+5
                data[message.author.tag]["nyas"].timer = Date.now() + 43200000 //43200000 = 12h en millisecondes
                message.channel.send("**" + message.author.username + "** récupère 5 Nyas:moneybag:")
            }
            else
            {
                data[mentionned.tag]["nyas"].nombre =+ data[mentionned.tag]["nyas"].nombre+5
                data[message.author.tag]["nyas"].timer = Date.now() + 43200000 //43200000 = 12h en millisecondes            
                message.channel.send("**" + message.author.username + "** offre 5 Nyas:moneybag: à **" + mentionned.username + "**")
            }
            fs.writeFile("./data.json", JSON.stringify(data,"","\t"), (err) => 
            {
                if (err) console.error(err)
            });
        }
    } 
    //========================================================================================//
})
client.login(process.env.TOKEN) //Recuperation du TOKEN dans les variables environnement