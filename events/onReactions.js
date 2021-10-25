module.exports = class OnReactions {

  constructor() { }

  static getRolesReaction(reaction, user, conf) {
    const message = reaction.message;
    const emoji = reaction.emoji;

    if (message.channel.name === conf.commands.admin.print.roles.channel) {
      message.guild.members.fetch(user.id).then(member => {
        switch(emoji.name) {
          case "1️⃣": // socle num
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.socle));
          case "2️⃣": // epsi b2
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.epsib2));
          case "3️⃣": // epsi b3
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.epsib3));
          case "4️⃣": // epsi i1
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.epsii1));
          case "5️⃣": // epsi i2
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.epsii2));
          case "6️⃣": // wis b2
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.wisb2));
          case "7️⃣": // wis b3
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.wisb3));
          case "8️⃣": // wis e1
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.wise1));
          case "9️⃣": // wis e2
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.wise2));
        }
      })
      .then(member => member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.student)))
      .then(member => member.roles.remove(member.guild.roles.cache.find(r => r.name === conf.roles.newStudent))
          .catch(err => console.log(err)));

      reaction.users.remove(user.id);
    }
  }

  static getWisSectionReaction(reaction, user, conf) {
    const message = reaction.message;
    const emoji = reaction.emoji;

    if (message.channel.name === conf.commands.admin.print.wis.channel) {
      message.guild.members.fetch(user.id).then(member => {
        switch(emoji.name) {
          case "1️⃣":
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.wisb1));
          case "2️⃣":
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.wisb2));
          case "3️⃣":
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.wisb3));
          case "4️⃣":
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.wisi1));
          case "5️⃣":
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.wisi2));
        }
      })
      .then(member => member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.student)))
      .then(member => member.roles.remove(member.guild.roles.cache.find(r => r.name === conf.roles.newStudent))
          .catch(err => console.log(err)));

      reaction.users.remove(user.id);
    }
  }

  static getRulesReaction(reaction, user, conf) {
    const message = reaction.message;
    const emoji = reaction.emoji;

    if (message.channel.name === conf.commands.admin.print.rules.channel) {
      message.guild.members.fetch(user.id).then(member => {
        if (emoji.name === '✅') {
          member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.student))
            .then(member => member.roles.remove(member.guild.roles.cache.find(r => r.name === conf.roles.newStudent)))
        } else if (emoji.name === "🚫") {
          console.error("CANNOT ADD ROLE BECAUSE REFUSING");
          // todo send private message
        }
      });

      reaction.users.remove(user.id);
    }
  }

}
