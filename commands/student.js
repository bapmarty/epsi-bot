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
      message.channel.send(`Votre pseudo à bie été changé <@${message.author.id}>`);
    } else {
      message.channel.send(` <@${message.author.id}> je ne peux pas changer ton pseudo, utilise la commande:\n\`\`!user rename [prenom.nom]\`\``);
    }
  }
}
