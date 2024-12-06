
import Settings from "../../../config";
import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { prefix, notePling } from "../../../utils/Utils";
import { getClass } from "../../../utils/player";
import { displayTitle } from "../../../utils/title";
import { onChatPacket } from "../../../../BloomCore/utils/Events";

/////////\\\\\\\\\\\\\
// Event: Tank Nuke ///////////////////////////////
registerWhen(register("chat", () => {
    if (Settings.notifyNuke)
        displayTitle(25, 5, `${Settings.nukeText}`, 80)
        ChatLib.chat(`${prefix} ${Settings.nukeText}`)
        if (Settings.notifyPartyNuke)
            setTimeout(() => ChatLib.command(`pc ${Settings.notifyPartyNukeText}`), 1000)
}).setCriteria(" ☠ You died to a mob and became a ghost."), () => Settings.notifyNuke)
///////////////////////////////////////////////////


////////\\\\\\\\\\\\\\\\
// Chat: Maxor Enrage /////////////////////////////
registerWhen(onChatPacket(() => {
    let selectedClass = getClass(Player.getName())
    if (selectedClass[0] == 'H') {
        if (Settings.wishNotify) {
            displayTitle(25, 5, `${Settings.wishNotifyText}`, 80)
            ChatLib.chat(`${prefix} ${Settings.wishNotifyText}`)
            notePling = true
        }
    } else if (selectedClass[0] == 'T') {
        if (Settings.notifyUltimate) {
            displayTitle(25, 5, `${Settings.notifyUltimatetext}`, 80)
            ChatLib.chat(`${prefix} ${Settings.notifyUltimatetext}`)
            notePling = true
        }
    }
}).setCriteria("⚠ Maxor is enraged! ⚠"), () => Settings.wishNotify || Settings.notifyUltimate)
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\\\\
// Event: Sadan Giants ////////////////////////////
registerWhen(onChatPacket(() => {
    setTimeout(() => {
        let selectedClass = getClass(Player.getName())
        if (selectedClass[0] == 'H') {
            if (Settings.wishNotify) {
                displayTitle(25, 5, `${Settings.wishNotifyText}`, 80)
                ChatLib.chat(`${prefix} ${Settings.wishNotifyText}`)
                notePling = true
            }
        } else if (selectedClass[0] == 'T' || selectedClass[0] == 'A') {
            if (Settings.notifyUltimate) {
                displayTitle(25, 5, `${Settings.notifyUltimatetext}`, 80)
                ChatLib.chat(`${prefix} ${Settings.notifyUltimatetext}`)
                notePling = true
            }
        }
    }, 3000)
}).setCriteria("[BOSS] Sadan: My giants! Unleashed!"), () => Settings.wishNotify || Settings.notifyUltimate)
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\\\\
// Event: Storm Enrage ////////////////////////////
registerWhen(onChatPacket(() => {
    if ((getClass(Player.getName)[0] == 'T' && Settings.stormEnrageTank && Settings.stormEnrage) || (Settings.stormEnrage && !Settings.stormEnrageTank)) {
            displayTitle(25, 5, `${Settings.stormEnrageText}`, 80)
            ChatLib.chat(`${prefix} ${Settings.stormEnrageText}`)
            notePling = true
    }
}).setCriteria("⚠ Storm is enraged! ⚠"), () => Settings.stormEnrageTank)
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\\\
// Event: Goldor Core /////////////////////////////
registerWhen(onChatPacket(() => {
    let selectedClass = getClass(Player.getName())
    if (selectedClass[0] == 'H') {
        if (Settings.wishNotify) {
            displayTitle(25, 5, `${Settings.wishNotifyText}`, 80)
            ChatLib.chat(`${prefix} ${Settings.wishNotifyText}`)
            notePling = true
        }
    } else if (selectedClass[0] == 'T' || selectedClass[0] == 'A') {
        if (Settings.notifyUltimate) {
            displayTitle(25, 5, `${Settings.notifyUltimatetext}`, 80)
            ChatLib.chat(`${prefix} ${Settings.notifyUltimatetext}`)
            notePling = true
        }
    }
}).setCriteria("[BOSS] Goldor: You have done it, you destroyed the factory…"), () => Settings.wishNotify || Settings.notifyUltimate)
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\
// Event: Healer Ult //////////////////////////////
registerWhen(register("chat", () => {
    if (Settings.wishedNotify) {
        displayTitle(25, 5, `${Settings.wishedNotifyText}`, 80)
        ChatLib.chat(`${prefix} ${Settings.wishedNotifyText}`)
    }
}).setCriteria("Your Wish healed your entire team for ${*} health and shielded them for ${*}!"), () => Settings.wishedNotify)
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\
// Event: Tank Ult ////////////////////////////////
registerWhen(register("chat",() => {
    if (Settings.notifyusedUltimate) {
        displayTitle(25, 5, `${Settings.notifyusedUltimatetext}`, 80)
        ChatLib.chat(`${prefix} ${Settings.notifyusedUltimatetext}`)
    }
}).setCriteria("Used Castle of Stone!"), () => Settings.notifyusedUltimate)
///////////////////////////////////////////////////