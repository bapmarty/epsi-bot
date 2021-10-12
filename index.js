const { Client, Intents } = require("discord.js");
const DeleteMessage = require("./commands/deleteMessage");
require('dotenv').config();

const ConfigYaml = require('./config/config');
const OnMemberJoinGuild = require("./events/onMemberJoin");
const OnReactions = require("./events/onReactions");
const ChooseRole = require("./Helper/chooseRole");
const Helper = require('./Helper/helper');

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

// github
client.on('raw', packet => {
	// We don't want this to run on unrelated packets
	if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
	// Grab the channel to check the message from
	const channel = client.channels.cache.get(packet.d.channel_id);
	// There's no need to emit if the message is cached, because the event will fire anyway for that
	if (channel.messages.cache.has(packet.d.message_id)) return;
	// Since we have confirmed the message is not cached, let's fetch it
	channel.messages.fetch(packet.d.message_id).then(message => {
			// Emojis can have identifiers of name:id format, so we have to account for that case as well
			const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
			// This gives us the reaction we need to emit the event properly, in top of the message object
			const reaction = message.reactions.cache.get(emoji);
			// Adds the currently reacting user to the reaction's users collection.
			if (reaction) reaction.users.cache.set(packet.d.user_id, client.users.cache.get(packet.d.user_id));
			// Check which type of event it is before emitting
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

	DeleteMessage.parse(message, client, conf);
	ChooseRole.parse(message, client, conf);
});

client.on("messageReactionAdd", (reaction, user) => {
	if (!user.bot) {
		OnReactions.getWelcomeReaction(reaction, user, conf);
		OnReactions.getEpsiSectionReaction(reaction, user, conf);
		OnReactions.getWisSectionReaction(reaction, user, conf);
	}
});
client.login(process.env.DISCORD_TOKEN);
