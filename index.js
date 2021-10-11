const { Client, Intents } = require("discord.js");
const DeleteMessage = require("./commands/deleteMessage");
require('dotenv').config();

const ConfigYaml = require('./config/config');
const OnMemberJoinGuild = require("./events/onMemberJoin");
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

client.on("guildMemberAdd", member => {
	console.log("new member joined, go to the class");
	member.roles.add(conf.roles.newStudent);
});

client.on("messageCreate", message => {
	Helper.parse(message, client, conf);
	DeleteMessage.parse(message, client, conf);
});

client.login(process.env.DISCORD_TOKEN);
