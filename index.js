//========================================================================================//
//  Dépendances
//========================================================================================//
if (process.version.slice(1).split(".")[0] < 8) throw new Error("Node 8.0.0 ou + requis.")
const Discord = require("discord.js")
const { promisify } = require("util")
const readdir = promisify(require("fs").readdir)
const Enmap = require("enmap")
const EnmapLevel = require("enmap-level")
const client = new Discord.Client()
client.config = require("./config.js")
client.logger = require("./util/Logger")
require("./modules/functions.js")(client)
client.commands = new Enmap()
client.aliases = new Enmap()
client.settings = new Enmap({provider: new EnmapLevel({name: "settings"})})
client.exp = new Enmap({provider: new EnmapLevel({name: "lvl"})})
client.nyas = new Enmap({provider: new EnmapLevel({name: "nyas"})})
client.calin = new Enmap({provider: new EnmapLevel({name: "calin"})})
//========================================================================================//
//  Chargement des fichiers externes
//========================================================================================//
const init = async () => 
{
  // Chargement des commandes
  const cmdFiles = await readdir("./commands/")
  client.logger.log(`Chargement d'un total de ${cmdFiles.length} commandes.`)
  cmdFiles.forEach(f => 
  {
    if (!f.endsWith(".js")) return
    const response = client.loadCommand(f)
    if (response) console.log(response)
  })

  // Chargement des events
  const evtFiles = await readdir("./events/")
  client.logger.log(`Chargement d'un total de ${evtFiles.length} events.`)
  evtFiles.forEach(file => 
  {
    const eventName = file.split(".")[0]
    const event = require(`./events/${file}`)
    client.on(eventName, event.bind(null, client))
    delete require.cache[require.resolve(`./events/${file}`)]
  })

  // Chargement des permissions
  client.levelCache = {}
  for (let i = 0; i < client.config.permLevels.length; i++)
  {
    const thisLevel = client.config.permLevels[i]
    client.levelCache[thisLevel.name] = thisLevel.level
  }

  // Connexion au bot
  client.login(client.config.token)
}
//========================================================================================//
//  Lancement du bot
//========================================================================================//
init()