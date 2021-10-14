const { MessageEmbed } = require("discord.js");
const MessageWrapper = require("../common/messageWrapper");

module.exports = class Student extends MessageWrapper {
  
  constructor() { }
  
  static match(message, prefix) {
    return message.content.startsWith(prefix + 'user') || message.content.startsWith(prefix + 'u');
  }

  static action(message, client, conf) {

    const params = message.content.split(" ")[1];

    if (params === "rename" || params === "-r") {
      this.updateStudentUsername(message, client, conf);
    }
  }

  static updateStudentUsername(message, client, conf) {
    const newName = message.content.split(" ")[2] || null;

    if (newName != null) {
      message.delete();
      message.member.setNickname(newName);
      em = new MessageEmbed()
        .setColor(0x7C147B)
        .setDescription(conf.commands.user.change.description.replace("%mention%", message.author.id));
      message.channel.send({embeds: [em]});
    } else {
      em = new MessageEmbed()
        .setColor(0x7C147B)
        .setDescription(conf.commands.user.error.description.replace("%mention%", message.author.id));
      message.channel.send({embeds: [em]});
    }
  }
}
