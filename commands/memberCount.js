const { MessageEmbed, MessageFlags } = require("discord.js");
const MessageWrapper = require("../common/messageWrapper");

module.exports = class MemberCount extends MessageWrapper {

  static match(message, prefix) {
    return message.content.startsWith(prefix + "members") || message.content.startsWith(prefix + "membercount");
  }

  static action(message, client, conf) {
    var em = new MessageEmbed()
      .setColor(0x7C147B);

    message.delete();
    if (message.channel.name === conf.commands.memberCount.channel) {
      message.delete();
        em
        .setTitle(conf.commands.memberCount.title.replace("%memberCount%", message.guild.memberCount))
        .setFooter(conf.embeds.footer.replace("%version%", conf.global.version))
        .setTimestamp()
      message.channel.send({embeds: [em]})
    } else {
      var channel = client.channels.cache.find(c => c.name === conf.commands.memberCount.channel);
      channel.send(conf.commands.memberCount.error.replace("%mention%", message.author.id));
    }
  }

}