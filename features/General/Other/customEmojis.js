import Settings from "../../../config";
import { registerWhen } from '../../../../BloomCore/utils/Utils';
import { getDataJson, prefix, resetEmojiGreet, line } from "../../../utils/Utils";

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Variables //////////////////////////////////////
const maxEmojiMessages = 25 //                   \\
const minEmojiMessages = 0 //                    //
let index //                                     \\
///////////////////////////////////////////////////
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


/////////\\\\\\\
// Emoji: Add /////////////////////////////////////
register('command', (...args) => {
    let data = getDataJson
    const name = args[0]
    const symbol = args.slice(1).join(' ')
    const message = args.join(' ').toLowerCase()

    if (args.length < 1) {
        ChatLib.chat(`${prefix} &cIncorrect Usage: /ua emoji add <emojiName> <emoji>`)
        return
    }
    if (data.emojis.emojis_custom.length >= maxEmojiMessages) {
      ChatLib.chat(`${prefix} &cYou already the maximum emojis ammount of ${maxEmojiMessages}.`)
      return
    }
    if (data.emojis.emojis_custom.hasOwnProperty(name)) {
        ChatLib.chat(`${prefix} &cAn emoji with the name "${name}" already exists.`)
        return
    }
    
    data.emojis.emojis_custom[name] = symbol
    data.save()
    ChatLib.chat(`${prefix} &aAdded new emoji: ${message}`)
}).setName('ua_command_emoji_add')
///////////////////////////////////////////////////


/////////\\\\\\\\\\
// Emoji: Remove //////////////////////////////////
register('command', (args) => {
    let data = getDataJson
    if (args.length < 1) {
        ChatLib.chat(`${prefix} &cIncorrect Usage: /ua emoji remove <index>`)
        return
    }
    if (Array.isArray(args)) {
        index = parseInt(args[0])
    } else {
        index = parseInt(args)
    }
    if (isNaN(index) || index < 1 || index > data.emojis.emojis_custom.length) {
        ChatLib.chat(`${prefix} &cInvalid index. Please enter a number between 1 and ` + data.emojis.emojis_custom.length)
        return
    }
    if (data.emojis.emojis_custom.length <= minEmojiMessages) {
        ChatLib.chat(`${prefix} &cYou have reached the minimum ammount of emojis of ${minEmojiMessages}.`)
        return
    }

    const keys = Object.keys(data.emojis.emojis_custom)
    const keyToRemove = keys[index - 1]
    delete data.emojis.emojis_custom[keyToRemove]
    data.save()
    ChatLib.chat(`${prefix} &aRemoved emoji: ${keys[index-1]}`)
}).setName('ua_command_emoji_remove')
///////////////////////////////////////////////////


/////////\\\\\\\\\\
// Emoji: Toggle //////////////////////////////////
register('command', (args) => {
    Settings.emojiCustom = !Settings.emojiCustom
    ChatLib.chat(`${prefix} ${Settings.emojiCustom ? "&fEmoji Messages Toggled, &aOn" : "&fEmoji Messages Toggled, &cOff"}`)
}).setName('ua_command_emoji')
///////////////////////////////////////////////////


/////////\\\\\\\\\
// Emoji: Reset ///////////////////////////////////
register('command', (args) => {
    resetEmojiGreet("emoji")
    ChatLib.chat(`${prefix} &aReset emojis!`)
}).setName('ua_command_emoji_reset')
///////////////////////////////////////////////////


/////////\\\\\\\\
// Emoji: List ////////////////////////////////////
register('command', () => {
    let data = getDataJson
    if (data.emojis.emojis_custom.length === 0) {
        ChatLib.chat(`${prefix} &cNo emojis set.`)
        return
    }
    ChatLib.chat(`&7${line}\n&5Current emojis:`)
    Object.entries(data.emojis.emojis_custom).forEach(([message, value], index) => {
        new Message(new TextComponent(`  &5${index + 1}. &d${message} &7- &d${value}`).setClick("suggest_command", `/ua emoji remove ${index + 1}`).setHover("show_text", `&cClick to remove &e&l${message} &7- &e&l${value}`)).chat()
    })
    ChatLib.chat(`&7${line}`)
}).setName('ua_command_emoji_list')
///////////////////////////////////////////////////


////////\\\\\\\\\
// Chat: Emoji ////////////////////////////////////
registerWhen(register('messageSent', (message, event) => {
    data = getDataJson
    if (!Settings.chatEmoji) return
    replacements = {}
    if (Settings.emojiMVP) {
        Object.assign(replacements, data.emojis.mvp)
    }
    if (Settings.emojiGift) {
        Object.assign(replacements, data.emojis.gift)
    }
    if (Settings.emojiCustom) {
        Object.assign(replacements, data.emojis.emojis_custom)
    }
    if (message.startsWith('/') && !message.startsWith('/pc') && !message.startsWith('/ac') && !message.startsWith('/gc') && !message.startsWith('/msg') && !message.startsWith('/w') && !message.startsWith('/r') && !message.startsWith('/cc')) return
    
    replaced = false
    let words = message.split(' ')

    for (let i = 0; i < words.length; i++) {
        if (replacements[words[i]]) {
            replaced = true
            words[i] = replacements[words[i]]
        }
    }
    if (!replaced) return
    cancel(event)
    ChatLib.say(words.join(' '))
}), () => Settings.chatEmoji)
///////////////////////////////////////////////////