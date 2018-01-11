module.exports = (client, newMessage, message) => 
{
  let now = Date.now()/1000
  let edit = newMessage.createdTimestamp.toString().slice(0, -3)
  //client.logger.log(now - edit + " Secondes depuis la création du message", "debug")
  if(now - edit < 60) {client.emit("message", message)}
  else return
}