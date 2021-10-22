const { MessageEmbed } = require("discord.js");
const MessageWrapper = require("../common/messageWrapper");

module.exports = class Student extends MessageWrapper {
  
  constructor() {
    super();
  }
  
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
    let temp = message.content;
    const newName = temp.split("\n")[0].substr(temp.indexOf(" ", 3) + 1) || null;
    const em = new MessageEmbed()
        .setColor(0x7C147B);

    if (newName != null) {
      message.delete();
      message.member.setNickname(newName).then(() => {
        em.setDescription(conf.commands.user.change.description.replace("%mention%", message.author.id));
        message.channel.send({embeds: [em]});
      }).catch(err => console.error('[' + '\x1b[31mERROR\x1b[0m'+ '] - ' + err.httpStatus + ' Permission denied - You cannot change username of an administrator'));
    } else {
      em.setDescription(conf.commands.user.error.description.replace("%mention%", message.author.id));
      message.channel.send({embeds: [em]});
    }
  }
}
