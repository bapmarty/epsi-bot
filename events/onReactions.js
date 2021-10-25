module.exports = class OnReactions {

  constructor() { }

  static getWelcomeReaction(reaction, user, conf) {
    const message = reaction.message;
    const emoji = reaction.emoji;

    if (message.channel.name === conf.commands.admin.print.school.channel) {
      message.guild.members.fetch(user.id).then(member => {
        member.roles.add(emoji.name === "1️⃣" ? member.guild.roles.cache.find(r => r.name === conf.roles.epsi) : member.guild.roles.cache.find(r => r.name === conf.roles.wis));
      });

      reaction.users.remove(user.id);
    }
  }

  static getEpsiSectionReaction(reaction, user, conf) {
    const message = reaction.message;
    const emoji = reaction.emoji;

    if (message.channel.name === conf.commands.admin.print.epsi.channel) {
      message.guild.members.fetch(user.id).then(member => {
        switch(emoji.name) {
          case "1️⃣":
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.epsib1));
          case "2️⃣":
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.epsib2));
          case "3️⃣":
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.epsib3));
          case "4️⃣":
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.epsii1));
          case "5️⃣":
            return member.roles.add(member.guild.roles.cache.find(r => r.name === conf.roles.epsii2));
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
