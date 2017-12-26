const Discord = require("discord.js")
const client = new Discord.Client()
const http = require('http')
const fs = require("fs-extra")
const express = require('express')
const app = express()

let data = JSON.parse(fs.readFileSync("./data.json", "utf8"))

var prefix = "!"
var token = process.env.TOKEN
var id = "393547720935211008"
var tag = "Maid-chan#0518"

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

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

client.on("ready", () =>
{
    console.log("Maid-chan mise a jour !")
    console.log(Date.now())
    
    client.user.setGame("Serveuse","https://www.twitch.tv/IA")
    //client.user.setAvatar("./Images/maid_chan_noel.png")

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
})

client.on("message", message =>
{
    var msgc = message.content.toLowerCase().sansAccent()
    //console.log(msgc)

    var salut = ["salut ","bonjour ","yo ","coucou ","hola ","hi ","もしもし ","привет ","buongiorno ","Konnichiwa ","你好 ","buenos dias ","ciao ","صباح الخير ","안녕하세요 "]
    var malpoli = [" bite","chibre","penis","phallus","zizi"]
    var maidchan = ["maidchan","maid-chan","maid"]

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

    if (msgc.startsWith(prefix + "calin"))
    {
        var mentionned = message.mentions.users.first()
        if ((!mentionned && data[tag]["calin"].timer < Date.now()))
        {
            message.channel.send("Tu n'a personne pour te faire un câlin ?")
            message.channel.send("**Maid-chan** fait un câlin virtuel:hugging: à **" + message.author.username + "**")
            data[tag]["calin"].timer = Date.now() + 43200000 //43200000 = 12h en millisecondes
            data[message.author.tag]["calin"].nombre++
            fs.writeFile("./data.json", JSON.stringify(data,"","\t"), (err) =>
            {
                if (err) console.error(err)
            });
            return
        }

        if (!mentionned || mentionned == message.author) 
        {
            message.channel.send("*mais personne n'est venu")
            return 
        }
        


        if ((data[message.author.tag]["calin"].timer > Date.now()) && (data[message.author.tag]["calin"].timer !== 0)) 
        {
            var now = new Date().getTime()
            var distance = data[message.author.tag]["calin"].timer - now
            var jours = Math.floor(distance / (1000 * 60 * 60 * 24))
            var heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            var secondes = Math.floor((distance % (1000 * 60)) / 1000)
            message.channel.send(message.author.username + 
            " tu a déjà câliner quelqu'un aujourd'hui, réesayer dans " + heures + "H" + minutes + ":hourglass_flowing_sand: ")
            return
        }
        else 
        {
            data[mentionned.tag]["calin"].nombre++
            data[message.author.tag]["calin"].timer = Date.now() + 43200000 //43200000 = 12h en millisecondes
            fs.writeFile("./data.json", JSON.stringify(data,"","\t"), (err) => 
            {
                if (err) console.error(err)
            });
            message.channel.send("**" + message.author.username + "** fait un câlin virtuel:hugging: à **" + mentionned.username + "**")
            return
        }
    }
    if (msgc.startsWith(prefix + "bonus"))
    {
        var mentionned = message.mentions.users.first()
        if (!mentionned || mentionned == message.author)
        {
            data[message.author.tag]["nyas"].nombre =+ data[message.author.tag]["nyas"].nombre+5
            data[message.author.tag]["nyas"].timer = Date.now() + 43200000 //43200000 = 12h en millisecondes
            fs.writeFile("./data.json", JSON.stringify(data,"","\t"), (err) => 
            {
                if (err) console.error(err)
            });
            message.channel.send("**" + message.author.username + "** récupère 5 Nyas:moneybag:")
            return
        }
        

        if ((data[message.author.tag]["nyas"].timer > Date.now()) && (data[message.author.tag]["nyas"].timer !== 0)) 
        {
            var now = new Date().getTime()
            var distance = data[message.author.tag]["nyas"].timer - now;
            var jours = Math.floor(distance / (1000 * 60 * 60 * 24))
            var heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            var secondes = Math.floor((distance % (1000 * 60)) / 1000)
            message.channel.send(message.author.username + 
            " tu a déjà utilisé ton bonus de Nyas:moneybag: aujourd'hui, réessaye dans " + heures + "h" + minutes + ":hourglass_flowing_sand: ")
            return 
        }
        else 
        {
            data[mentionned.tag]["nyas"].nombre =+ data[mentionned.tag]["nyas"].nombre+5
            data[message.author.tag]["nyas"].timer = Date.now() + 43200000 //43200000 = 12h en millisecondes
            fs.writeFile("./data.json", JSON.stringify(data,"","\t"), (err) => 
            {
                if (err) console.error(err)
            });
            message.channel.send("**" + message.author.username + "** offre 5 Nyas:moneybag: à **" + mentionned.username + "**")
            return
        }
    }
})
client.login(token)