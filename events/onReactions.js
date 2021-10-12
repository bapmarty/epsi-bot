module.exports = class OnReactions {

  constructor() { }

  static getWelcomeReaction(reaction, user, conf) {
    const message = reaction.message;
    const emoji = reaction.emoji;

    if (message.channel.id === conf.printRole.channelIdSchool) {
      message.guild.members.fetch(user.id).then(member => {
        member.roles.add(emoji.name === "1️⃣" ? conf.roles.epsi : conf.roles.wis);
      });
    }
  }

  static getEpsiSectionReaction(reaction, user, conf) {
    const message = reaction.message;
    const emoji = reaction.emoji;

    if (message.channel.id === conf.printRole.channelIdEPSI) {
      message.guild.members.fetch(user.id).then(member => {
        switch(emoji.name) {
          case "1️⃣":
            return member.roles.add(conf.roles.epsib1);
          case "2️⃣":
            return member.roles.add(conf.roles.epsib2);
          case "3️⃣":
            return member.roles.add(conf.roles.epsib3);
          case "4️⃣":
            return member.roles.add(conf.roles.epsii1);
          case "5️⃣":
            return member.roles.add(conf.roles.epsii2);
        }
      }).then(member => member.roles.remove(conf.roles.newStudent));
    }
  }

}