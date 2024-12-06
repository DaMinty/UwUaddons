import { monthsShort } from "../../BloomCore/utils/Utils";
import { registerWhen } from "../../BloomCore/utils/Utils";
import PogObject from "../../PogData";
import request from "../../requestV2";

export const prefix = "&7[&dUwU&baddons&7]&r"
export const prefix2 = "UwUaddons »"
export const line = "&m-".repeat(ChatLib.getChatWidth() / 6);

export const getSkyblockShiiyu = (uuid) => request({url: `https://sky.shiiyu.moe/api/v2/profile/${uuid}`, headers: { 'User-Agent': ' Mozilla/5.0', 'Content-Type': 'application/json' }, json: true})

export const S2APacketParticles = Java.type('net.minecraft.network.play.server.S2APacketParticles')

/**
 * Unix tingy
 *
 * @param {Number} UNIX_timestamp - unix timespamp
 * @returns {String} - d/m/y h:m:s
 */
export function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear();
    var month = monthsShort[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
}

export let notePling = { value: false }
registerWhen(register("step", () => {
    if (notePling.value) {
        World.playSound("note.pling", 1.0, 2.0)
        notePling.value = false
    }
}), () => notePling)

export let customSoundVal = { value: false, sound: "", pitch: 0, volume: 0 }
registerWhen(register("step", () => {
    if (customSoundVal.value) {
        World.playSound(customSoundVal.sound, 1.0, customSoundVal.pitch) 
        customSoundVal.value = false
        customSoundVal.sound = ""
        customSoundVal.pitch = 0
    }
}), () => customSoundVal.value)

export function playSnd(sound="notePling", volume=1, pitch=1) {
    customSoundVal.sound = sound
    customSoundVal.pitch = pitch
    customSoundVal.volume = volume
    customSoundVal.value = true
}

const suggest =  "&8|| &eClick to Suggest Command"
export const uaHelp = new Message(
    new TextComponent(`&7${line}`), `\n`,
    new TextComponent(`&5List of commands: &8(&c&o* &r&7= Required&8)`), `\n`,
    new TextComponent(`&d/ua`).setHover("show_text", `&dOpens UwUaddons GUI ${suggest}`).setClick("suggest_command", `/ua`), `\n`,
    new TextComponent(`&d/ua help`).setHover("show_text", `&dShows this help block ${suggest}`).setClick("suggest_command", `/ua help`), `\n`,
    new TextComponent(`&d/ua coords`).setHover("show_text", `&dSends your coords (Compatible with BLC) ${suggest}`).setClick("suggest_command", `/ua coords`), `\n`,
    new TextComponent(`&d/ua version`).setHover("show_text", `&dShows the current UwUaddons version ${suggest}`).setClick("suggest_command", `/ua version`), `\n`,
    new TextComponent(`&d/ua diana &f[&duser&f]&c&o*`).setHover("show_text", `&dCheck the users diana stats ${suggest}`).setClick("suggest_command", `/ua diana`), `\n`,
    new TextComponent(`&d/ua greeting &f[&dAdd&f|&dRemove&f|&dList&f|&dReset&f]`).setHover("show_text", `&dGreetins when a user joins hypixel ${suggest}`).setClick("suggest_command", `/ua greeting help`), `\n`,
    new TextComponent(`&d/ua emoji &f[&dAdd&f|&dRemove&f|&dList&f|&dReset&f]`).setHover("show_text", `&dTransfers "&fo/&d" to "( ﾟ◡ﾟ)" ${suggest}`).setClick("suggest_command", `/ua emoji help`), `\n`,
    new TextComponent(`&d/ua setcarry &f[&dinteger&f]`).setHover("show_text", `&dSet Carry Ammount ${suggest}`).setClick("suggest_command", `/ua setcarry`), `\n`,
    new TextComponent(`&d/ua carrymode &f[&dM7&f|&dM6&f|&dM5&f|&dOff&f|&dNone&f]`).setHover("show_text", `&dCarry Mode Toggle ${suggest}`).setClick("suggest_command", `/ua carrymode`), `\n`,
    new TextComponent(`&d/ua plot &f[&dinteger&f]&c&o* &7Alias: /plot, /tpp`).setHover("show_text", `&dTP to a garden plot fast ${suggest}`).setClick("suggest_command", `/ua plot`), `\n`,
    new TextComponent(`&7${line}`)
)

export const uaGreetingHelp = new Message(
    new TextComponent(`&7${line}`), `\n`,
    new TextComponent(`&5List of commands: &8(&c&o* &r&7= Required&8) &8(&7{user} to mention the user&8)`), `\n`,
    new TextComponent(`&d/ua greeting help`).setHover("show_text", `&dShows this help block ${suggest}`).setClick("suggest_command", `/ua greeting help`), `\n`,
    new TextComponent(`&d/ua greeting add &f[&dstring&f]&c&o*`).setHover("show_text", `&dAdd a greeting ${suggest}`).setClick("suggest_command", `/ua greeting add`), `\n`,
    new TextComponent(`&d/ua greeting remove &f[&dinteger&f]&c&o*`).setHover("show_text", `&dRemove a greeting ${suggest}`).setClick("suggest_command", `/ua greeting remove`), `\n`,
    new TextComponent(`&d/ua greeting reset`).setHover("show_text", `&dResets all greetings ${suggest}`).setClick("suggest_command", `/ua greeting reset`), `\n`,
    new TextComponent(`&d/ua greeting list`).setHover("show_text", `&dList all greetings ${suggest}`).setClick("suggest_command", `/ua greeting list`), `\n`,
    new TextComponent(`&7${line}`)
)

export const uaEmojiHelp = new Message(
    new TextComponent(`&7${line}`), `\n`,
    new TextComponent(`&5List of commands: &8(&c&o* &r&7= Required&8) &8(&7{user} to mention the user&8)`), `\n`,
    new TextComponent(`&d/ua emoji help`).setHover("show_text", `&dShows this help block ${suggest}`).setClick("suggest_command", `/ua emoji help`), `\n`,
    new TextComponent(`&d/ua emoji add &f[&d<emojiName> <emoji>&f]&c&o*`).setHover("show_text", `&dAdd a emoji ${suggest}`).setClick("suggest_command", `/ua emoji add`), `\n`,
    new TextComponent(`&d/ua emoji remove &f[&dinteger&f]&c&o*`).setHover("show_text", `&dRemove a emoji ${suggest}`).setClick("suggest_command", `/ua emoji remove`), `\n`,
    new TextComponent(`&d/ua emoji reset`).setHover("show_text", `&dResets all emoji ${suggest}`).setClick("suggest_command", `/ua emoji reset`), `\n`,
    new TextComponent(`&d/ua emoji list`).setHover("show_text", `&dList all emoji ${suggest}`).setClick("suggest_command", `/ua emoji list`), `\n`,
    new TextComponent(`&7${line}`)
)
// jsonFile
export const getDataJson = new PogObject('UwUaddons', {
    greetingMessages: {
        messages: [
        "Welcome {user}!",
        "Hey {user}, isnt UwUaddons is the best!",
        "Hello {user}!",
        "What's up {user}",
        "Hey {user}!",
        "Hi {user}!",
        "Yo {user}!"
        ],
        ignoredUsers: [

        ],
        currentIndex: -1
    },
    emojis: {
        mvp: {
            '<3': '❤',
            'o/': '( ﾟ◡ﾟ)/',
            ':star:': '✮',
            ':yes:': '✔',
            ':no:': '✖',
            ':java:': '☕',
            ':arrow:': '➜',
            ':shrug:': '¯\\_(\u30c4)_/¯',
            ':tableflip:': '(╯°□°）╯︵ ┻━┻',
            ':totem:': '☉_☉',
            ':typing:': '✎...',
            ':maths:': '√(π+x)=L',
            ':snail:': "@'-'",
            ':thinking:': '(0.o?)',
            ':gimme:': '༼つ◕_◕༽つ',
            ':wizard:': "('-')⊃━☆ﾟ.*･｡ﾟ",
            ':pvp:': '⚔',
            ':peace:': '✌',
            ':puffer:': "<('O')>"
        },
        gift: {
            ':dab:': '<o/',
            'h/': 'ヽ(^◇^*)/',
            ':dog:': '(ᵔᴥᵔ)',
            ':yey:': 'ヽ (◕◡◕) ﾉ',
            ':cat:': '= ＾● ⋏ ●＾ =',
            ':cute:': '(✿◠‿◠)',
            ':snow:': '☃',
            ':sloth:': '(・⊝・)',
            ':dj:': 'ヽ(⌐■_■)ノ♬'
        },
        emojis_custom: {
            ':skull:': '☠',
            ':wheelchair:': '♿',
            ':wc:': '♿',
            ':caution:': '⚠',
            ':warning:': '⚠',
            ':explosion:': '✳',
            ':biohazard:': '☣',
            ':)': 'Â',
            '0_0': '☉_☉',
            ':!!:': '‼',
            ':!?:': '⁉'
        }
    },
    data: {
        firstLoad: true,
        simonSaysPB: 0,
        last_version: undefined
    },
    guiLocs: {
        pre4Status: {
            "x": 0.0,
            "y": 0.0,
            "scale": 1
        },
        carryCount: {
            "x": 0.0,
            "y": 0.0,
            "scale": 1
        }
    }
}, "data.json")   

export function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed = current - previous;
    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }
    else if (elapsed < msPerMonth) {
        return Math.round(elapsed/msPerDay) + ' days ago';   
    }
    else if (elapsed < msPerYear) {
        return Math.round(elapsed/msPerMonth) + ' months ago';   
    }
    else {
        return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}

const resetData = {
    emojis_custom: {
        ':skull:': '☠',
        ':wheelchair:': '♿',
        ':wc:': '♿',
        ':caution:': '⚠',
        ':warning:': '⚠',
        ':explosion:': '✳',
        ':biohazard:': '☣',
        ':)': 'Â',
        '0_0': '☉_☉',
        ':!!:': '‼',
        ':!?:': '⁉'
    },
    messages: [
        "Welcome {user}!",
        "Hey {user}, isnt UwUaddons is the best!",
        "Hello {user}!",
        "What's up {user}",
        "Hey {user}!",
        "Hi {user}!",
        "Yo {user}!"
        ],
}

export function resetEmojiGreet(emojiGreet) {
    data = getDataJson
    if (emojiGreet == "emoji") {
        data.emojis.emojis_custom = resetData.emojis_custom
    } else if (emojiGreet == "greet") {
        data.greetingMessages.messages = resetData.messages
    } else return
    data.save()
}