const { MessageEmbed } = require("discord.js");
const MessageWrapper = require("../common/messageWrapper");

module.exports = class About extends MessageWrapper {
  static match(message, prefix) {
    return message.content.startsWith(prefix + "about");
  }

  static action(message, client, conf) {
    message.delete();
    const em = new MessageEmbed()
        .setColor(0x7C147B)
        .setTitle(conf.commands.about.title)
        .setDescription(conf.commands.about.description)
        .setTimestamp()
        .setFooter(conf.embeds.footer.replace("%version%", conf.global.version));
    message.channel.send({embeds: [em]});
  }
}
