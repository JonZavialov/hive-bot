const getJsonContent = require('./getJsonContent')

const ping = require('../commands/ping')
const help = require('../commands/help')

async function parseCommand(msg, prefix){
    const commands = await getJsonContent(__dirname.substring(0, __dirname.length-9) + "commands\\commands.json")
    const commandsList = Object.keys(commands)

    const args = msg.content.trim().split(/ +/g)
    let firstWord = args[0].substring(prefix.length,args[0].length)
    
    let commandsAliasList
    let isCommand = false
    for(let i = 0; i < commandsList.length; i++){
        commandsAliasList = Object.values(commands[commandsList[i]].alias)

        if(commandsAliasList.includes(firstWord)){
            isCommand = true
            firstWord = commandsList[i]
            break
        }
    }

    if(!isCommand) return
    
    const commandArgs = commands[firstWord].args

    if(commandArgs < args.length -1){
        msg.lineReply('Too many arguements!')
        return
    }else if(commandArgs > args.length -1){
        msg.lineReply(`Missing ${commandArgs-args.length+1} arguements`)
        return
    }

    let evalString = firstWord + "(msg,"
    for(let i = 1; i < commandArgs + 1; i++){
        let append = "'" + args[i] + "',"
        evalString += append
    }
    evalString = evalString.substring(0,evalString.length-1) + ")"
    eval(evalString)
}

module.exports = parseCommand