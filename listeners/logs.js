const {MessageEmbed} = require("discord.js");
module.exports = class Logs {
  constructor(member = null, message = null, client = null, logMessage, color, channel) {
    this.message = message;
    this.client = client;
    this.logMessage = logMessage;
    this.color = color;
    this.channel = this.message.guild.channels.cache.find(c => c.name === channel);

    const em = new MessageEmbed()
      .setColor(this.color)
      .setDescription(this.logMessage.replace("%mention%", message.author.id).replace("%channel%", message.channel.id))
      .setTimestamp();

    this.channel.send({embeds: [em]});
  }
}
