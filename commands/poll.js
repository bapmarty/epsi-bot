const { MessageEmbed } = require("discord.js");
const MessageWrapper = require("../common/messageWrapper");

module.exports = class Poll extends MessageWrapper {
  static match(message, prefix) {
    return message.content.startsWith(prefix + "poll");
  }

  static action(message, client, conf) {
    const temp = message.content;
    const question = temp.split("\n")[0].substr(temp.indexOf(" ") + 1) || null;
    const description = temp.substr(temp.indexOf("\n") + 1) || null;

    message.delete();
    if (question != null) {
      const em = new MessageEmbed()
        .setColor(0x7C147B)
        .setTitle(question)
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(description != null ? description : "")
        .setTimestamp()
        .setFooter(conf.commands.poll.footer.replace("%mention%", message.author.username));
      message.channel.send({embeds: [em]})
        .then(embed => embed.react("👍")
          .then(() => embed.react("👎"))
        );
    }
  }
}
