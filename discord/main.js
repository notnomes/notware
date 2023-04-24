const {Client, GatewayIntentBits, time} = require('discord.js');
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]});
const channelId = '1099964249931006052';

  
  async function send(msg) {
    setTimeout(async () => {
    const channel = client.channels.cache.get(channelId);
        if (!channel) {
               return;
        }
        try {
              await channel.send(msg);
        } catch (error) {
             console.error(error);
        }
    }, 3000);
  }
  
  module.exports = { client, send };
