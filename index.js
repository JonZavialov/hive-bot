const getJsonContent = require('./utilities/getJsonContent')
const parseCommand = require('./utilities/parseCommand')

const Discord = require('discord.js')
require('discord-reply')
const client = new Discord.Client()

getJsonContent(__dirname + "/logins.json" )
.then((logins) => {
    const token = logins["discord_token"]
    client.login(token)
})

const prefix = "+"

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity('Moderating The Bryson Coalition')
})

client.on('message', msg => {
    if(msg.author.id == '880617388222062642') return

    if(msg.content.startsWith(prefix)){
        parseCommand(msg, prefix)
    }
})