const { MessageEmbed } = require("discord.js");

const MessageWrapper = require("../common/messageWrapper");

module.exports = class ChooseRole extends MessageWrapper {
  constructor () { }

  static match(message, prefix) {
    return message.content.startsWith(prefix + "print-role");
  }

  static action(message, client, conf) {
    const witchSection = message.content.split(" ")[1];

    message.delete();
    if (witchSection === "school") {
      this.getRoleForSchool(message, conf);
    } else if (witchSection === "epsi") {
      this.getRoleForEpsi(message, conf);
    } else if (witchSection === "wis") {
      this.getRoleForWis(message, conf);
    }
  }

  static getRoleForSchool(message, conf) {
    const em = new MessageEmbed()
    .setColor(0x7C147B)
    .setTitle(conf.printRole.titleSchool)
    .setDescription(conf.printRole.descriptionSchool);

  message.channel.send({embeds: [em]})
    .then(emMessage => emMessage.react("1️⃣")
      .then(() => emMessage.react("2️⃣"))
    );
  }

  static getRoleForEpsi(message, conf) {
    const em = new MessageEmbed()
      .setColor(0x7C147B)
      .setTitle(conf.printRole.titleEPSI)
      .setDescription(conf.printRole.descriptionEPSI);

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
      .setTitle(conf.printRole.titleWIS)
      .setDescription(conf.printRole.descriptionWIS);

    message.channel.send({embeds: [em]})
      .then(emMessage => emMessage.react("1️⃣")
        .then(() => emMessage.react("2️⃣"))
        .then(() => emMessage.react("3️⃣"))
        .then(() => emMessage.react("4️⃣"))
        .then(() => emMessage.react("5️⃣"))
      );
  }
}