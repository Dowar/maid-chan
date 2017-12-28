//========================================================================================//
//  Commande - prefix + bonus
//========================================================================================//
exports.run = (client ,fs , message, args, mentionned, data, commande, id, tag) => 
{
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