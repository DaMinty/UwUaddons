import Settings from "../../../config";
import { displayTitle } from "../../../utils/title";
import { getDataJson, line, prefix, prefix2 } from "../../../utils/Utils";
import { getClassOther } from "../../../utils/player";
import { onChatPacket } from "../../../../BloomCore/utils/Events";

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Variables //////////////////////////////////////
let goldorPhase = 0 //                           \\
let startPre4Time = 0 //                         //
let simonSaysSartTime = undefined //             \\
export let pre4complete = {value: false} //      //
export let inGoldor = {value: false} //          \\
///////////////////////////////////////////////////
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//\\\\\\\\\\\\\
// Functions //////////////////////////////////////
function pre4incompleteMsg(reminder=false) {
    if (Settings.notifyi4 && Settings.pre4incomp) {
        displayTitle(40, 5, `&cPre 4 Not Complete!`, 80)
        ChatLib.chat(`&r&9${line}\n${prefix} &cPre 4 was not completed\n&r&9${line}`)
        if (Settings.notifypartyi4) {
            ChatLib.command(reminder ? `pc ${prefix2} Pre 4 incomplete (reminder)` : `pc ${prefix2} Pre 4 incomplete`)
        }
    }
}
// --------------------------------------------- //
function pre4completeMsg(player, reminder=false) {
    if (Settings.notifyi4 && Settings.pre4comp) {
        displayTitle(40, 5, `&aCompleted Pre 4!`, 80)
        ChatLib.chat(`&r&9${line}\n${prefix} &aPre 4 Complete\n&r&9${line}`)
        if (Settings.notifypartyi4)
            ChatLib.command(reminder ? `pc ${prefix2} Pre 4 is complete (reminder)` : `pc ${prefix2} Pre 4 completed by ${player}`)
    }
}
///////////////////////////////////////////////////


////////\\\\\\\\\\\\\\\\\ register("chat", () => {
// Event: Goldor Start ////////////////////////////
onChatPacket(() => {
    startPre4Time = Date.now()
    simonSaysSartTime = Date.now()
    goldorPhase = 1
    inGoldor.value = true
    pre4complete.value = false
    setTimeout(() => {
        if (pre4complete.value == true || inGoldor == false) return
        pre4incompleteMsg()
    }, 15000)
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?")
///////////////////////////////////////////////////


/////////\\\\\\\\\
// Event: Pre 4 ///////////////////////////////////
register("chat", (player, accom, devTerm, number1, number2) => {
    if ((number1 == 7 && number2 == 7) || (number1 == 8 && number2 == 8)) {
        goldorPhase = goldorPhase + 1
        if (goldorPhase == 4) {
            if (pre4complete.value == false && Settings.pre4incompRem) {
                pre4incompleteMsg(true)
            } else if (pre4complete.value == true && Settings.pre4compRem) {
                pre4completeMsg("", true)
            }
        } else if (goldorPhase == 5) {
            inGoldor.value = false
        }
    }
    if (getClassOther(player)[0] == 'B' && Settings.notifyi4 && !pre4complete.value && devTerm == "device") {
        if (Date.now()-startPre4Time < 12000) {
            pre4complete.value = true
            startPre4Time = 0
            pre4completeMsg(player, false)
            return
        }
    }
    if (devTerm != "device" || getClassOther(player)[0] == 'B') return
    if (Settings.devicecomplete) {
        displayTitle(50, 5, `&2Device Complete`, 80)
    }
    if (Settings.simonsaystime && simonSaysSartTime) {
        let data = getDataJson
        let msgConstruct = new Message(new TextComponent(`&r&9${line}\n${prefix} &fSimon Says took &l${((Date.now()-simonSaysSartTime) / 1000).toFixed(2)}s`))
        if (player == Player.getName()) {
            if (data.data.simonSaysPB > Date.now()-simonSaysSartTime || data.data.simonSaysPB == 0) {
                let tempOldpb = data.data.simonSaysPB
                data.data.simonSaysPB = Date.now()-simonSaysSartTime
                data.save()
                msgConstruct.addTextComponent(new TextComponent(` &d&lPB!`).setHover("show_text", `&5&nOld&r &5Personal Best: &d${(tempOldpb / 1000).toFixed(2)}!`))
            } else {
                msgConstruct.addTextComponent(new TextComponent(` &8(&7${(data.data.simonSaysPB / 1000).toFixed(2)}&8)`).setHover("show_text", `&5Personal Best: &d${(data.data.simonSaysPB / 1000).toFixed(2)}`))
            }
        }
        msgConstruct.addTextComponent(new TextComponent(`\n&r&9${line}`))
        msgConstruct.chat()
        if (Settings.notifyPartySimonSays) {
            ChatLib.command(`pc ${prefix2} Simon Says took ${((Date.now()-simonSaysSartTime) / 1000).toFixed(2)}s`)
        }
        simonSaysSartTime = undefined
    }
}).setCriteria(/(\w{1,16}) (activated|completed) a (lever|device|terminal)! \((\d)\/((7|8))\)/)
///////////////////////////////////////////////////


/////////\\\\\\\\\\
// Event: Unload //////////////////////////////////
register(`worldUnload`, () => {
    goldorPhase = 0
    startPre4Time = 0
    simonSaysSartTime = 0
    pre4complete.value = false
    inGoldor.value = false
})
///////////////////////////////////////////////////