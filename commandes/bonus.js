//========================================================================================//
//  Commande - prefix + bonus
//========================================================================================//
exports.run = (client,fs,message,args,mentionned,data,commande,id,tag,author) => 
{
        if ((data[author.tag]["nyas"].timer > Date.now()))
        {
            var now = new Date().getTime()
            var distance = data[author.tag]["nyas"].timer - now;
            var heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            message.channel.send("**"+ author.username + "**" + 
            " tu a déjà utilisé ton bonus de Nyas :euro: aujourd'hui, réessaye dans " + heures + "h" + minutes + ":hourglass_flowing_sand: ")
        }
        else 
        {
            if (!mentionned || mentionned == author)
            {
                data[author.tag]["nyas"].nombre =+ data[author.tag]["nyas"].nombre+5
                data[author.tag]["nyas"].timer = Date.now() + 43200000 //43200000 = 12h en millisecondes
                message.channel.send("**" + author.username + "** récupère 5 Nyas :euro:")
            }
            else
            {
                data[mentionned.tag]["nyas"].nombre =+ data[mentionned.tag]["nyas"].nombre+5
                data[author.tag]["nyas"].timer = Date.now() + 43200000 //43200000 = 12h en millisecondes            
                message.channel.send("**" + author.username + "** offre 5 Nyas :euro: à **" + mentionned.username + "**")
            }
            fs.writeFile("./data.json", JSON.stringify(data,"","\t"), (err) => 
            {if (err) console.error(err)})
        }
    }