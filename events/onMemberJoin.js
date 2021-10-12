module.exports = class OnMemberJoinGuild {
  constructor(member, conf) {
    console.log("New member joined");
    this.addRoleToNewMember(member, conf);
  }

  addRoleToNewMember(member, conf) {
    member.roles.add(conf.roles.newStudent);
    console.log("Role added");
  }

}