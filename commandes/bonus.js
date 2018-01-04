//========================================================================================//
//  Commande - prefix + bonus
//========================================================================================//
exports.run = (client,fs,message,args,mentionned,data,commande,id,tag,author) => 
{   
    var now = new Date().toLocaleDateString().replace("-","").replace("-","")

    if (data[author.tag]["nyas"].timer === now)
    {message.channel.send(":hourglass_flowing_sand: **"+ author.username + "** tu a déjà utilisé ton bonus de Nyas :euro: aujourd'hui !")}
    else
    {
        if (!mentionned || mentionned === author)
        {
            data[author.tag]["nyas"].nombre =+ data[author.tag]["nyas"].nombre+5
            data[author.tag]["nyas"].timer = now
            message.channel.send("**" + author.username + "** récupère 5 Nyas :euro:")
        }
        else
        {
            data[mentionned.tag]["nyas"].nombre =+ data[mentionned.tag]["nyas"].nombre+5
            data[author.tag]["nyas"].timer = now           
            message.channel.send("**" + author.username + "** offre 5 Nyas :euro: à **" + mentionned.username + "**")
        }
        fs.writeFile("./data.json", JSON.stringify(data,"","\t"), (err) => 
        {if (err) console.error(err)})
    }
}