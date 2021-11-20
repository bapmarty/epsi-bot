const Logs = require("../channels/Logs");
module.exports = class OnMemberJoinGuild {
  constructor(member, conf) {
    this.member = member;
    this.conf = conf;
    this.addRoleToNewMember();
    this.sendGeneralMessage();
  }

  addRoleToNewMember() {
    this.member.roles.add(this.member.guild.roles.cache.find(r => r.name === this.conf.roles.newStudent));
    console.log("[" + "\x1b[34mINFO\x1b[0m" + "] - 200 - Role added to " + this.member.user.username);
  }

  sendGeneralMessage() {
    const channel = this.member.guild.channels.cache.find(c => c.name === this.conf.listeners.welcome.channel);
    channel.send(this.conf.listeners.welcome.message.replace("%mention%", this.member.id));
  }
}
