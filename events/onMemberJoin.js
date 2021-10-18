module.exports = class OnMemberJoinGuild {
  constructor(member, conf) {
    this.addRoleToNewMember(member, conf);
  }

  addRoleToNewMember(member, conf) {
    member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.newStudent));
    console.log("Role added");
  }

}
