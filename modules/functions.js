module.exports = (client) => 
{
//========================================================================================//
//  Niveaux de permissions
//========================================================================================//
  client.permlevel = message => 
  {
    let permlvl = 0
    const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1)
    while (permOrder.length) 
    {
      const currentLevel = permOrder.shift()
      if (message.guild && currentLevel.guildOnly) continue
      if (currentLevel.check(message)) {permlvl = currentLevel.level; break}
    } return permlvl
  }
//========================================================================================//
//  Attente de réponse
//========================================================================================//
  client.awaitReply = async (msg, question, limit = 60000) => 
  {
    const filter = m=>m.author.id = msg.author.id
    await msg.channel.send(question)
    try 
    {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] })
      return collected.first().content
    } catch (e) {return false}
  }

  client.clean = async (client, text) => 
  {
    if (text && text.constructor.name == "Promise") {text = await text}
    if (typeof evaled !== "string") {text = require("util").inspect(text, {depth: 0})}
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0")
    return text
  }
//========================================================================================//
//  Chargement de commande
//========================================================================================//
  client.loadCommand = (commandName) => 
  {
    try 
    {
      const props = require(`../commands/${commandName}`)
      client.logger.log(`Commande chargée : ${props.help.name}. 👌`)
      if (props.init) {props.init(client)}
      client.commands.set(props.help.name, props)
      props.conf.aliases.forEach(alias => {client.aliases.set(alias, props.help.name)})
      return false
    } catch (e) {return `Impossible de charger la commande ${commandName}: ${e}`}
  }
//========================================================================================//
//  Déchargement de commande
//========================================================================================//
  client.unloadCommand = async (commandName) => 
  {
    let command
    if (client.commands.has(commandName)) 
    {command = client.commands.get(commandName)} 
    else if (client.aliases.has(commandName)) {command = client.commands.get(client.aliases.get(commandName))}
    if (!command) return `La commande \`${commandName}\` ne semble pas exister !`
    if (command.shutdown) {await command.shutdown(client)}
    delete require.cache[require.resolve(`../commands/${commandName}.js`)]
    return false
  }
//========================================================================================//
//  Gestion EXP - LEVEL UP
//========================================================================================//
  client.pointsMonitor = (client, message) => 
  {
    if (message.channel.type !=='text') return
    const settings = client.settings.get(message.guild.id)
    if (message.content.startsWith(settings.prefix)) return
    const score = client.exp.get(message.author.id) || { exp: 0, lvl: 1 }
    score.exp = score.exp+1
    const curLevel = 0.1 * Math.sqrt(score.exp)
    const curLevelAR = Math.floor(curLevel)
    if (score.lvl < curLevelAR)
    {
      message.reply(` gagne un niveau. **[LVL.${curLevelAR}]**`)
      score.lvl = curLevel
    }
    client.exp.set(message.author.id, score)
  }
//========================================================================================//
//  Prototypages
//========================================================================================//
  String.prototype.toProperCase = function() 
  {return this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()})}
  Array.prototype.random = function() {return this[Math.floor(Math.random() * this.length)]}
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
    ]
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c']
    var str = this
    for(var i = 0; i < accent.length; i++)
    {str = str.replace(accent[i], noaccent[i])} return str
  }
//========================================================================================//
//  Erreurs
//========================================================================================//
  client.wait = require("util").promisify(setTimeout)
  process.on("uncaughtException", (err) => 
  {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./")
    client.logger.error(`Exception non interceptée: ${errorMsg}`)
    process.exit(1)
  })
  process.on("unhandledRejection", err => {client.logger.error(`Exception non interceptée: ${err}`)})
}
