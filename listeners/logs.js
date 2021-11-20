const {MessageEmbed} = require("discord.js");

module.exports = class Logs {
  constructor(client, conf) {
    this.conf = conf;
    client.on('guildBanAdd', (member) => { this.constructor.errorLog(member, conf.logs.banMessage, conf.listeners.logs.channel) });

    client.on('guildBanRemove', (member) => { this.constructor.infoLog(member, conf.logs.unbanMessage, conf.listeners.logs.channel) });

    client.on('guildMemberRemove', (member) => { this.constructor.warningLog(member, conf.logs.kickedMessage, conf.listeners.logs.channel) });
  }

  static errorLog(member, msg, channelName = this.conf.listeners.logs.channel) {
    const em = new MessageEmbed()
      .setColor(0xff0000)
      .setDescription(msg.replace("%mention%", member.user.id))
      .setTimestamp();
    const channel = member.guild.channels.cache.find(c => c.name === channelName);
    channel.send({embeds: [em]});
  }

  static infoLog(member, msg, channelName = this.conf.listeners.logs.channel) {
    const em = new MessageEmbed()
      .setColor(0x00FF00)
      .setDescription(msg.replace("%mention%", member.user.id))
      .setTimestamp();
    const channel = member.guild.channels.cache.find(c => c.name === channelName);
    channel.send({embeds: [em]});
  }

  static primaryLog(member, msg, channelName = this.conf.listeners.logs.channel) {
    const em = new MessageEmbed()
      .setColor(0x0000FF)
      .setDescription(msg.replace("%mention%", member.user.id))
      .setTimestamp();
    let channel;
    if (member.guild) {
      channel = member.guild.channels.cache.find(c => c.name === channelName);
    } else {
      channel = member.guilds.client.channels.cache.find(c => c.name === channelName);
    }
    channel.send({embeds: [em]});
  }

  static warningLog(member, msg, channelName = this.conf.listeners.logs.channel) {
    const em = new MessageEmbed()
      .setColor(0xFF7F00)
      .setDescription(msg.replace("%mention%", member.user.id))
      .setTimestamp();
    const channel = member.guild.channels.cache.find(c => c.name === channelName);
    channel.send({embeds: [em]});
  }
}
