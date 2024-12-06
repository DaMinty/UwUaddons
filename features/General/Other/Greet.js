
import Settings from "../../../config";
import { registerWhen } from '../../../../BloomCore/utils/Utils';
import { getDataJson, prefix, resetEmojiGreet, line } from "../../../utils/Utils";

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Variables //////////////////////////////////////
const maxGreetingMessages = 20 //                //
const minGreetingMessages = 5 //                 \\
let currentGreetingIndex = 0 //                  \\
let index //                                     //
///////////////////////////////////////////////////
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//\\\\\\\\\\\\\
// Functions //////////////////////////////////////
function cycleGreetingMessages() {
    let data = getDataJson
    currentGreetingIndex = (data.greetingMessages.currentIndex + 1) % data.greetingMessages.messages.length
    data.greetingMessages.currentIndex = currentGreetingIndex
    data.save()
    return data.greetingMessages.messages[data.greetingMessages.currentIndex]
}
///////////////////////////////////////////////////


////////\\\\\\\\\
// Chat: Join /////////////////////////////////////
registerWhen(register('chat', (fG, user, event) => {
    if (!Settings.greetFriendandGuild) return
    if (Settings.greetGuild && (fG == "Guild" || fG == "Friend")) {
        setTimeout(() => {
            const message = cycleGreetingMessages()
            if (fG == "Guild" && Settings.greetGuildType == 1) {
                ChatLib.command(`gc ${message.replace('{user}', user)}`)
            } else {
                ChatLib.command(`msg ${user} ${message.replace('{user}', user)}`)
            }
        }, 800)
    }
}).setCriteria(/(Guild|Friend) > (.+) joined./), () => Settings.greetFriendandGuild)
///////////////////////////////////////////////////


///////////\\\\\\\
// Command: Add ///////////////////////////////////
register('command', (...args) => {
    let data = getDataJson
    if (args.length < 1) {
        ChatLib.chat(`${prefix} &cIncorrect Usage: /ua greeting add <message>`)
        return
    }
    const message = args.join(' ').toLowerCase()
    if (data.greetingMessages.messages.length >= maxGreetingMessages) {
      ChatLib.chat(`${prefix} &cYou already the maximum greetings ammount of ${maxGreetingMessages}.`)
      return
    }
    if (data.greetingMessages.messages.some(existingMessage => existingMessage.toLowerCase() === message)) {
        ChatLib.chat(`${prefix} &cThis greeting message already exists.`)
        return
    }
    data.greetingMessages.messages.push(message)
    data.save()
    ChatLib.chat(`${prefix} &aAdded new greeting: ${message}`)
}).setName('ua_command_greeting_add')
///////////////////////////////////////////////////


////////////\\\\\\\\\\
// Greeting: Remove ///////////////////////////////
register('command', (args) => {
    let data = getDataJson
    if (args.length < 1) {
        ChatLib.chat(`${prefix} &cIncorrect Usage: /ua greeting remove <index>`)
        return
    }
    if (Array.isArray(args)) {
        index = parseInt(args[0])
    } else {
        index = parseInt(args)
    }
    if (isNaN(index) || index < 1 || index > data.greetingMessages.messages.length) {
        ChatLib.chat(`${prefix} &cInvalid index. Please enter a number between 1 and ` + data.greetingMessages.messages.length)
        return
    }
    if (data.greetingMessages.messages.length <= minGreetingMessages) {
        ChatLib.chat(`${prefix} &cYou have reached the minimum ammount of greetings of ${minGreetingMessages}.`)
        return
    }
    const message = data.greetingMessages.messages[index - 1]
    data.greetingMessages.messages.splice(index - 1, 1)
    data.save()
    ChatLib.chat(`${prefix} &aRemoved greeting: ${message}`)
}).setName('ua_command_greeting_remove')
///////////////////////////////////////////////////


////////////\\\\\\\\\\
// Greeting: Toggle ///////////////////////////////
register('command', (args) => {
    Settings.greetFriendandGuild = !Settings.greetFriendandGuild
    ChatLib.chat(`${prefix} ${Settings.greetFriendandGuild ? "&fGreeting Messages Toggled, &aOn" : "&fGreeting Messages Toggled, &cOff"}`)
}).setName('ua_command_greeting')
///////////////////////////////////////////////////


////////////\\\\\\\\\
// Greeting: Reset ////////////////////////////////
register('command', (args) => {
    resetEmojiGreet("greet")
    ChatLib.chat(`${prefix} &aReset greetings!`)
}).setName('ua_command_greeting_reset')
///////////////////////////////////////////////////


///////////\\\\\\\\
// Command: List ///////////////////////////////////
register('command', () => {
    let data = getDataJson
    if (data.greetingMessages.messages.length === 0) {
        ChatLib.chat(`${prefix} &cNo greetings set.`)
        return
    }
    ChatLib.chat(`&7${line}\n&5Current greetings:`)
    data.greetingMessages.messages.forEach((message, index) => {
        new Message(new TextComponent(`  &5${index + 1}. &d${message}`).setClick("suggest_command", `/ua greeting remove ${index + 1}`).setHover("show_text", `&cClick to remove &e&l${message}`)).chat()
    })
    ChatLib.chat(`&7${line}`)
}).setName('ua_command_greeting_list')
////////////////////////////////////////////////////


///////////\\\\\\\\\\\\\\\
// Event: Hide Greeting /// ( chat gpt was here) //
registerWhen(register('chat', (rank, user, msg, event) => {
    if (!Settings.greetHide) return
    let data = getDataJson
    let cleanedUser = user.replace(/\[[\w+\+-]+] /, "").trim()
    let cleanedMsg = msg.replace(/\[[\w+\+-]+] /, "").replace(new RegExp(cleanedUser, 'i'), "{user}").trim()
    for (let i = 0; i < data.greetingMessages.messages.length; i++) {
        let expectedMsg = data.greetingMessages.messages[i]
        if (cleanedMsg === expectedMsg && Settings.greetHide) {
            cancel(event)
            return
        }
    }
}).setCriteria(/To (\[[\w+\+-]+])? ?([\w]+): (.+)/), () => Settings.greetHide)
///////////////////////////////////////////////////