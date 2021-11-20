const { MessageEmbed } = require("discord.js");

const MessageWrapper = require("../common/messageWrapper");

module.exports = class PrintEmbedText extends MessageWrapper {
  constructor () {
    super();
  }

  static match(message, prefix) {
    return message.content.startsWith(prefix + "display");
  }

  static action(message, client, conf) {
    const witchSection = message.content.split(" ")[1];

    message.delete();
    if (message.member.roles.cache.some(r => r.name === conf.roles.owner)) {
      if (witchSection === "roles") {
        this.displayRolesSelectorMessage(message, conf);
      } else if (witchSection === "rules") {
        this.displayRulesMessage(message, conf);
      }
    }
  }

  static displayRolesSelectorMessage(message, conf) {
    const em = new MessageEmbed()
      .setColor(0x7C147B)
      .setTitle(conf.commands.admin.print.roles.title)
      .setDescription(conf.commands.admin.print.roles.description);

    message.channel.send({embeds: [em]})
      .then(emMessage => emMessage.react("1️⃣") // socle
        .then(() => emMessage.react("2️⃣")) // epsi b2
        .then(() => emMessage.react("3️⃣")) // epsi b3
        .then(() => emMessage.react("4️⃣")) // epsi i1
        .then(() => emMessage.react("5️⃣")) // epsi i2
        .then(() => emMessage.react("6️⃣")) // wis b2
        .then(() => emMessage.react("7️⃣")) // wis b3
        .then(() => emMessage.react("8️⃣")) // wis e1
        .then(() => emMessage.react("9️⃣")) // wis e2
      );
  }

  static displayRulesMessage(message, conf) {
    const em = new MessageEmbed()
      .setColor(0x7C147B)
      .setTitle(conf.commands.admin.print.rules.title)
      .setDescription(conf.commands.admin.print.rules.description);

    message.channel.send({embeds: [em]})
      .then(emMessage => emMessage.react("✅")
        .then(() => emMessage.react("🚫"))
      );
  }
}
