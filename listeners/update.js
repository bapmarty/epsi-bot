const { MessageEmbed } = require("discord.js");

module.exports = class Update {
  constructor(message, client, conf) {
    if (message.author.bot) {
      return ;
    }

    if (message.member.roles.cache.some(r => r.name === conf.roles.owner)
      && message.channel.name === conf.commands.admin.update.channel) {
        message.delete();

        const content = message.content;
        const em = new MessageEmbed()
          .setColor(0x2F3136)
          .setTitle(conf.commands.admin.update.title.replace("%version%", conf.global.version))
          .setDescription(content);

        message.channel.send({embeds: [em]});
      }
  }
}
