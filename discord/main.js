const {Client, Routes, GatewayIntentBits} = require('discord.js')
const client = new Client({intents: [GatewayIntentBits.Guilds]})

const run = async () => {
    client.login(process.env.TOKEN)
}

const send = async (msg) => {
    const channel = ""
}