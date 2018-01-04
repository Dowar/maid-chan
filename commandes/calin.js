//========================================================================================//
//  Commande - prefix + calin                                      
//========================================================================================//
exports.run = (client,fs,message,args,mentionned,data,commande,id,tag,author) => 
{
    var now = new Date().toLocaleDateString().replace("-","").replace("-","")

    if (!mentionned) 
    {
        if (data[tag]["calin"].timer === now)
        {message.channel.send(":hourglass_flowing_sand: Désolé j'ai déjà atteint mon quota de calin :hugging: aujourd'hui !")}
        else
        {
            message.channel.send("Tu n'a personne pour te faire un câlin ?")
            message.channel.send("**Maid-chan** fait un câlin virtuel :hugging: à **" + author.username + "**")
            data[tag]["calin"].timer = now
            data[author.tag]["calin"].nombre++
            fs.writeFile("./data.json", JSON.stringify(data,"","\t"), (err) =>
            {if (err) console.error(err)})
        }
    }
    else if (mentionned === author)
    {message.channel.send("*mais personne n'est venu")}
    else
    {
        if (data[author.tag]["calin"].timer === now)
        {message.channel.send(":hourglass_flowing_sand: **" + author.username + "** tu a déjà câliner :hugging: quelqu'un aujourd'hui !")}
        else
        {
            data[mentionned.tag]["calin"].nombre++
            data[author.tag]["calin"].timer = now
            fs.writeFile("./data.json", JSON.stringify(data,"","\t"), (err) => 
            {if (err) console.error(err)})
            message.channel.send("**" + author.username + "** fait un câlin virtuel :hugging: à **" + mentionned.username + "**")
        }
    }
}