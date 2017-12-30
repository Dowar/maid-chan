//========================================================================================//
//  Commande - prefix + calin                                      
//========================================================================================//
exports.run = (client,fs,message,args,mentionned,data,commande,id,tag) => 
{
    if (!mentionned) 
    {
        if ((data[tag]["calin"].timer > Date.now()))
        {
        message.channel.send("Désolé j'ai déjà atteint mon quota de calin aujourd'hui !")
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