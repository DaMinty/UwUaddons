import Settings from "./config"
import axios from "../axios"
import { getDataJson, prefix, uaEmojiHelp, uaGreetingHelp, uaHelp } from "./utils/Utils"

/**
 * This is my first module so i have
 * copied (and changed) some stuff from other modules
 * Credits include (Sorry if i forget one):
 * Volcaddons | kuudraview mod, party.js
 * Bloom(core)? | :)
 * AzuredClient | tick timer
 * Griffinowo | subcommands & i think gui
 * 
 * I'm also not the best at making the most
 * efficient thingys but its works ig, i
 * tried to reduce as much lag as i could
 * but i probably made it worse lmao. i started
 * making this when i had no clue how js worked lol
 * 
 *
 * also ty for docilelm for helping
 * with some stuff <3
 * 
 * 
 * Some suggestions by / testers:
 * @ shotgunshelly
 * @ simplegamer14
 * @ noelxd
 * @ jusseden
 * @ abdl
 * @ notpvpz
 * @ trags103
 */

// import "./features"
import "./features/Diana/Inquisitor/DianaInq"
import "./features/Diana/Treasure/DianaTreasure"
import "./features/Diana/Party/dianaProfileView"
import "./features/Dungeons/Device/DungDevice"
import "./features/Dungeons/General/DungGeneral"
import "./features/Dungeons/HealerxTank/DungHealerxTank"
import "./features/General/Other/GenOther"
import "./features/General/Sounds/GenSounds"
import "./features/General/UwUify/GenUwUify"
import "./features/General/Other/Greet"
import "./features/General/Other/customEmojis"
import "./features/Diaz/General/StockofStonks"
import "./features/Mining/General/MiningGen"
import "./features/General/Other/PartyCmds"
import "./utils/guiHandle"

data = getDataJson
const version = JSON.parse(FileLib.read("UwUaddons", "metadata.json")).version

if (data.data.firstLoad) {
    setTimeout(() => {
        ChatLib.chat(`\n${prefix.replace("[", "").replace("]", "")}\n&aThanks for downloading &lUwUaddons\n&eVersion: &lv${version}\n&6Command: &l/ua help\n`)
        data.data.firstLoad = false
        data.data.last_version = version
        data.save()
    }, 300)
}




register("command", () => {
    new Message(`&aFetching API data from ChatTriggers`).setChatLineId(3547).chat()  
    axios.get(`https://chattriggers.com/api/modules/uwuaddons`)
    .then(res => {
        ChatLib.clearChat(3547)
        let changes = res.data.releases[0].changelog.toString().replaceAll("\r", "")
        const newVer = res.data.releases[0].releaseVersion
        ChatLib.chat(`&ev${newVer} Changelog:\n${changes}`)
    })
}).setName("ua_command_version_changelog")

let ctNoti = false
register("worldLoad", () => {
    if (ctNoti) return
    axios.get(`https://chattriggers.com/api/modules/uwuaddons`)
    .then(res => {
        let changes = res.data.releases[0].changelog.toString().replaceAll("\r", "")
        const newVer = res.data.releases[0].releaseVersion
        if (data.data.last_version !== version) {
            if (data.data.last_version === undefined) return
            ChatLib.chat(`\n${prefix.replace("[", "").replace("]", "")}\n&aUwUaddons has updated! &ev${data.data.last_version} ➜ v${version}`)
            new TextComponent(`&a&lClick here to view v${version}'s change log!\n`)
                .setClickAction("run_command")
                .setClickValue(`/ua_command_version_changelog`)
                .chat()
            data.data.last_version = version
            data.save()
            ctNoti = true;
        } else {
            // NWJN || https://www.chattriggers.com/modules/v/NwjnAddons
                if (newVer == version) return;
                if (version.includes("pre")) return;
                
                if (newVer != version) {
                    ChatLib.chat(`\n${prefix.replace("[", "").replace("]", "")}\n&aUwUaddons has an available update! &2v${version} ➜ v${newVer}\n&eChangelog:\n${changes}`)
                    new TextComponent(`&a&lClick here to update!\n`)
                    .setClickAction("run_command")
                    .setClickValue(`/ct load`)
                    .chat()
                    ctNoti = true;
                }
            //
        }
    })
})


register("command", (...args) => {
    const subCommand = args[0] == undefined ? undefined : args[0].toLowerCase();
    const subCommand2 = args[1] == undefined ? undefined : args[1].toLowerCase();

    switch (subCommand) {
        case undefined:
            Settings.openGUI();
            break
        case 'help':
            uaHelp.chat()
            break
        case 'setcarry':
            args.shift();
            args.unshift("ua_command_setcarry");
            ChatLib.command(args.join(" "), true);
            break
        case 'version':
            ChatLib.chat(`${prefix} &eYou're currently using &lv${version}`)
            break
        case 'carrymode':
            args.shift();
            args.unshift("ua_command_carrymode");
            ChatLib.command(args.join(" "), true);
            break
        case 'coords':
            args.shift();
            args.unshift("ua_command_coords");
            ChatLib.command(args.join(" "), true);
            break
        case 'tpp':
        case 'tpplot':
        case 'plot':
            args.shift();
            args.unshift("ua_command_plottp");
            ChatLib.command(args.join(" "), true);
            break
        case 'diana':
            args.shift();
            args.unshift("ua_command_diana");
            ChatLib.command(args.join(" "), true);
            break
        case 'emoji':
        case 'emojis':
        case 'customemoji':
        case 'customemojis':
        case 'custom_emoji':
        case 'custom_emojis':
            args.shift();
            switch (subCommand2) {
                case "+":
                case "add":
                    args.shift();
                    args.unshift("ua_command_emoji_add");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "-":
                case "delete":
                case "del":
                case "rem":
                case "remove":
                    args.shift();
                    args.unshift("ua_command_emoji_remove");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "l":
                case "ls":
                case "v":
                case "view":
                case "list":
                    args.shift();
                    args.unshift("ua_command_emoji_list");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "reset":
                    args.shift();
                    args.unshift("ua_command_emoji_reset");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "h":
                case "help":
                    uaEmojiHelp.chat()
                    break
                case undefined:
                    args.shift();
                    args.unshift("ua_command_emoji");
                    ChatLib.command(args.join(" "), true);
                    break;
                default:
                    ChatLib.chat(`${prefix} &cUnknown subcommand for emoji. Use /ua emoji help for more information`)
                    break
            }
            break
        case 'greet':
        case 'greetings':
        case 'greeting':
            args.shift();
            switch (subCommand2) {
                case "+":
                case "add":
                    args.shift();
                    args.unshift("ua_command_greeting_add");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "-":
                case "delete":
                case "del":
                case "rem":
                case "remove":
                    args.shift();
                    args.unshift("ua_command_greeting_remove");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "l":
                case "ls":
                case "v":
                case "view":
                case "list":
                    args.shift();
                    args.unshift("ua_command_greeting_list");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "reset":
                    args.shift();
                    args.unshift("ua_command_greeting_reset");
                    ChatLib.command(args.join(" "), true);
                    break;
                case "h":
                case "help":
                    uaGreetingHelp.chat()
                    break
                case undefined:
                    args.shift();
                    args.unshift("ua_command_greeting");
                    ChatLib.command(args.join(" "), true);
                    break;
                default:
                    ChatLib.chat(`${prefix} &cUnknown subcommand for greeting. Use /ua greeting help for more information`)
                    break
            }
            break
        default:
            ChatLib.chat(`${prefix} &cUnknown subcommand. Use /ua help for a list of commands.`)
            break
    }
}).setName("ua").setAliases("uwuaddons").setAliases("mintyaddons").setAliases("ma").setAliases("minty").setAliases("uwu")