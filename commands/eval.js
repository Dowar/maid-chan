//========================================================================================//
//  Execution de Javascript
//========================================================================================//
exports.run = async (client, message, args, level) => 
{
  const code = args.join(" ")
  try 
  {
    const evaled = eval(code)
    const clean = await client.clean(client, evaled)
    message.channel.send(`\`\`\`js\n${clean}\n\`\`\``)
  } 
  catch (err) {message.channel.send(`\`ERREUR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``)}
}
//========================================================================================//
//  Config
//========================================================================================//
exports.conf = 
{
  enabled: true,
  guildOnly: false,
  aliases: ["ev"],
  permLevel: "Deus"
}
//========================================================================================//
//  Aide
//========================================================================================//
exports.help = 
{
  name: "eval",
  category: "Système",
  description: "Execute du Javascript.",
  usage: "eval <code>"
}
