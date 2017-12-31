//========================================================================================//
//  Dialogues
//========================================================================================//
exports.run = (client,fs,message,mentionned,data,dialogue,id,tag,author) =>
{
    //========================================================================================//
    //  Dictionnaire
    //========================================================================================//
    var salut = ["salut ","bonjour ","yo ","coucou ","hola ","hi ","もしもし ","привет ","buongiorno ","Konnichiwa ","你好 ","buenos dias ","ciao ","صباح الخير ","안녕하세요 "]
    var cava = ["sa va","ca va"]
    var malpoli = [" bite","chibre","penis","phallus","zizi"]
    var maidchan = ["maidchan","maid-chan","maid","tout le monde","les gens"]
    //========================================================================================//
    //  Salut
    //========================================================================================//
    if (salut.some(mots => dialogue.includes(mots))&&maidchan.some(mots => dialogue.includes(mots)))
    {
        if (message.author.id !== id)
        {
            var r = Math.floor((Math.random()*10))
            if(r<=4)
            {message.channel.send("Salut " + message.author.username + " !")}
            if(r>=5)
            {message.channel.send("Bonjour " + message.author.username + " !")}
        }
    }
    //========================================================================================//
    //  ça va ?
    //========================================================================================//
    if (cava.some(mots => dialogue.includes(mots))&&maidchan.some(mots => dialogue.includes(mots)))
    {
        if (message.author.id !== id)
        {
            var r = Math.floor((Math.random()*10))
            if(r<=4)
            {message.channel.send("ça va !")}
            if(r>=5)
            {message.channel.send("ça va bien !")}
        }
    }
    //========================================================================================//
    //  Censure
    //========================================================================================//
    if (malpoli.some(mots => dialogue.includes(mots)))
    {
        if (message.author.id !== id)
        {
            var r = Math.floor((Math.random()*10))
            if(r<=3)
            {message.channel.send("Malpoli !")}
            if(r>=4&&r<8)
            {message.channel.send("Malotru !")}
            if(r>=9)
            {message.channel.send("Goujat !")}
        }
        message.delete()
    }
    //========================================================================================//
    //  Joyeux noêl                                     
    //========================================================================================//
    if (dialogue.startsWith("joyeux noel")||dialogue.startsWith("noyeux joel"))
    {
        if (message.author.id !== id)
        {
            var r = Math.floor((Math.random()*10))
            if(r>=0 && r<=0)
            {
                message.channel.send("Joyeux Noël " + message.author.username + " !",
                {
                    "embed": 
                    {
                        "color": 10073378,
                        "image": 
                        {"url": "https://dncache-mauganscorp.netdna-ssl.com/thumbseg/1575/1575662-bigthumbnail.jpg"}
                    }
                })
                return
            }
            if(r>=1 && r<=2)
            {
                message.channel.send("Joyeux Noël " + message.author.username + " !",
                {
                    "embed": 
                    {
                        "color": 10073378,
                        "image": 
                        {"url": "http://www.wallpapermaiden.com/image/2017/01/10/re-zero-emilia-santa-clothes-smiling-white-hair-cute-anime-11876.jpg"}
                    }
                })
                return
            }
            if(r>=3 && r<=4)
            {
                message.channel.send("Joyeux Noël " + message.author.username + " !",
                {
                    "embed": 
                    {
                        "color": 10073378,
                        "image": 
                        {"url": "https://i.pinimg.com/originals/c3/e1/00/c3e100447886edf3ab07ab7b1bcaab8d.jpg"}
                    }
                })
                return
            }
            if(r>=5 && r<=6)
            {
                message.channel.send("Joyeux Noël " + message.author.username + " !",
                {
                    "embed": 
                    {
                        "color": 10073378,
                        "image": 
                        {"url": "https://i.pinimg.com/originals/1f/83/5b/1f835b49538368864f256fe2fa26ac5f.jpg"}
                    }
                })
                return
            }
            if(r>=7 && r<=8)
            {
                message.channel.send("Joyeux Noël " + message.author.username + " !",
                {
                    "embed": 
                    {
                        "color": 10073378,
                        "image": 
                        {"url": "https://vignette.wikia.nocookie.net/steamtradingcards/images/3/3c/Sakura_Santa_Artwork_6.jpg/revision/latest?cb=20160123103843"}
                    }
                })
                return
            }
            if(r>=9 && r<=10)
            {
                message.channel.send("Joyeux Noël " + message.author.username + " !",
                {
                    "embed": 
                    {
                        "color": 10073378,
                        "image": 
                        {"url": "https://tugaleres.files.wordpress.com/2014/11/kuroyukihime_santa_anime_accel-world.jpg"}
                    }
                })
                return
            }
        }
    }
    //========================================================================================//
}