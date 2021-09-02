const getJsonContent = require('../utilities/getJsonContent')

async function help(msg){
    const commands = await getJsonContent(__dirname.substring(0, __dirname.length-9) + "\\commands\\commands.json") 

    let helpString = ""
    let aliases

    let helpKey
    let helpDesc
    let helpArgs

    keys = Object.keys(commands)
    
    for(let i = 0; i < keys.length; i++){
        helpKey = keys[i]
        helpDesc = commands[helpKey].desc
        helpArgs = commands[helpKey].args
        aliases = commands[helpKey].alias

        helpString += `\`\`${helpKey}\`\`: ${helpDesc} \`\`arguements: ${helpArgs}\`\`,\`\`aliases: `

        for(let i = 0; i < aliases.length; i++){
            helpString += aliases[i] + ", "
        }

        helpString = helpString.substring(0, helpString.length-2)
        helpString +=  `\`\`\n\n`
    }

    msg.lineReply(helpString)
}
module.exports = help