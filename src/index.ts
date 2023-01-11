require('dotenv').config();
const { REST, Routes, Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    notifyChannel(process.env.NOTIFICATION_CHANNEL_ID, 'Bot has been activated')
});

function notifyChannel(channel_ID: string, content: string) {
  const channel = client.channels.cache.find(channel => channel.id === channel_ID);
  channel.send(content)
}

function getBalance(api:string, balance_location: string,account: string) {
  axios.get(`${api}${account}`)
    .then(res => console.log(res.data[balance_location]))
    .catch(err => console.log(err));
}

