module.exports = (client, newMessage, message) => 
{
  let now = Date.now()/1000                                         // Date actuelle
  let edit = newMessage.createdTimestamp.toString().slice(0, -3)    // Date du message édité

  //client.logger.log(now - edit + " Secondes depuis la création du message", "debug")

  if(now - edit < 60) {client.emit("message", message)} else return // Comparaison pour verifier si le message est réçent et donc s'il doit être relu ou non
}