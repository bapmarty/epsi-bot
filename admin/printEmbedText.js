const { MessageEmbed } = require("discord.js");

const MessageWrapper = require("../common/messageWrapper");

module.exports = class PrintEmbedText extends MessageWrapper {
  constructor () { }

  static match(message, prefix) {
    return message.content.startsWith(prefix + "print");
  }

  static action(message, client, conf) {
    const witchSection = message.content.split(" ")[1];

    message.delete();
    if (message.member.roles.cache.some(r => r.name === conf.roles.owner)) {
      if (witchSection === "school") {
        this.getRoleForSchool(message, conf);
      } else if (witchSection === "epsi") {
        this.getRoleForEpsi(message, conf);
      } else if (witchSection === "wis") {
        this.getRoleForWis(message, conf);
      }
    }
  }

  static getRoleForSchool(message, conf) {
    const em = new MessageEmbed()
    .setColor(0x7C147B)
    .setTitle(conf.commands.admin.print.school.title)
    .setDescription(conf.commands.admin.print.school.description);

  message.channel.send({embeds: [em]})
    .then(emMessage => emMessage.react("1️⃣")
      .then(() => emMessage.react("2️⃣"))
    );
  }

  static getRoleForEpsi(message, conf) {
    const em = new MessageEmbed()
      .setColor(0x7C147B)
      .setTitle(conf.commands.admin.print.epsi.title)
      .setDescription(conf.commands.admin.print.epsi.description);

    message.channel.send({embeds: [em]})
      .then(emMessage => emMessage.react("1️⃣")
        .then(() => emMessage.react("2️⃣"))
        .then(() => emMessage.react("3️⃣"))
        .then(() => emMessage.react("4️⃣"))
        .then(() => emMessage.react("5️⃣"))
      );
  }

  static getRoleForWis(message, conf) {
    const em = new MessageEmbed()
      .setColor(0x7C147B)
      .setTitle(conf.commands.admin.print.wis.title)
      .setDescription(conf.commands.admin.print.wis.description);

    message.channel.send({embeds: [em]})
      .then(emMessage => emMessage.react("1️⃣")
        .then(() => emMessage.react("2️⃣"))
        .then(() => emMessage.react("3️⃣"))
        .then(() => emMessage.react("4️⃣"))
        .then(() => emMessage.react("5️⃣"))
      );
  }
}