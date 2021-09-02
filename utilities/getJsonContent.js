const fs = require('fs')

async function getDiscordContent(path){
    let rawdata = await fs.readFileSync(path)
    let json = JSON.parse(rawdata)

    return json
}

module.exports = getDiscordContent