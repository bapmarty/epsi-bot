const { Client } = require("discord.js");
require('dotenv').config();

const ConfigYaml = require('./config/config');
const OnMemberJoinGuild = require("./events/onMemberJoin");
const OnReactions = require("./events/onReactions");
const Helper = require('./commands/helper');
const Student = require('./commands/student');
const Delete = require("./admin/delete");
const PrintEmbedText = require("./admin/printEmbedText");
const Poll = require("./commands/poll");
const MemberCount = require("./commands/memberCount");
const Site = require("./commands/site");
const Update = require("./listeners/update");
const About = require("./commands/about");

const conf = new ConfigYaml().conf;

const intents = [
	"GUILDS",
	"GUILD_MESSAGES",
	"GUILD_MEMBERS",
	"GUILD_MESSAGE_REACTIONS"
];
const client = new Client({intents: intents, ws:{intents: intents}});

client.on("ready", () => {
	console.log(conf.global.onLogin);
});

// github to focus old message, because the bot take only reaction state on new message !
client.on('raw', packet => {
	if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
	const channel = client.channels.cache.get(packet.d.channel_id);
	if (channel.messages.cache.has(packet.d.message_id)) return;
	channel.messages.fetch(packet.d.message_id).then(message => {
			const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
			const reaction = message.reactions.cache.get(emoji);
			if (reaction) reaction.users.cache.set(packet.d.user_id, client.users.cache.get(packet.d.user_id));
			if (packet.t === 'MESSAGE_REACTION_ADD') {
					client.emit('messageReactionAdd', reaction, client.users.cache.get(packet.d.user_id));
			}
			if (packet.t === 'MESSAGE_REACTION_REMOVE') {
					client.emit('messageReactionRemove', reaction, client.users.cache.get(packet.d.user_id));
			}
	});
});

client.on("guildMemberAdd", member => {
	new OnMemberJoinGuild(member, conf);
});

client.on("messageCreate", message => {
	Helper.parse(message, client, conf);
	Student.parse(message, client, conf);
	Poll.parse(message, client, conf);
	MemberCount.parse(message, client, conf);
	Site.parse(message, client, conf);
	About.parse(message, client, conf);

	Delete.parse(message, client, conf);
	PrintEmbedText.parse(message, client, conf);
	new Update(message, client, conf);
});

client.on("messageReactionAdd", (reaction, user) => {
	if (!user.bot) {
		OnReactions.getRolesReaction(reaction, user, conf);
		OnReactions.getRulesReaction(reaction, user, conf);
	}
});

client.login(process.env.DISCORD_TOKEN);
