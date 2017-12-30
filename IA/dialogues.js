//========================================================================================//
//  Dialogues
//========================================================================================//
exports.run = (client , fs, message, mentionned, data, dialogue, id, tag) =>
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
    //  ça va ?
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
    //  Censure
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
    //  Joyeux noêl                                     
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
}