import Settings, { dragDebuff1array, dragDebuff2array, dragDebuff3array } from "../../../config";
import party from "../../../utils/party";
import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { line, prefix, prefix2, notePling, S2APacketParticles } from "../../../utils/Utils";
import { onChatPacket } from "../../../../BloomCore/utils/Events";


//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Variables //////////////////////////////////////
let downtimedemon = "" //                        \\
let downtimereason = "" //                       //
export let ammountOfCarry = { value: 1 } //      \\
export let currentCarries = { value: 0 } //      //
let bossKilled = false //                        \\
let cancelrequeue = false //                     //
let readybefore = false //                       \\
let isInP5 = false //                            //
let arrowsHit = 0 //                             \\
let iceSprayHit = false //                       //
let listening = false //                         \\
let hitIce = false //                            //
let hitIcedate = 0 //                            \\
let hitLB = false //                             //
let hitLBdate = 0 //                             \\
let split = 0 //                                 //
///////////////////////////////////////////////////
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//\\\\\\\\\\\\\\\\\\\\\
// Functions / Const //////////////////////////////////////
function reinstance() {
    msg = new Message(new TextComponent(`&r&9${line}\n${prefix} &aClick here to re-instance\n&r&9${line}`).setClick("run_command", `/instancerequeue`).setHover("show_text", `&aClick here to Requeue!`))
    msg.chat()
}
// --------------------------------------------- //
function cancelrq() {
    msg = new Message(new TextComponent(`&r&9${line}\n${prefix} &cClick here to cancel auto go!\n&r&9${line}`).setClick("run_command", `/cancelrq`).setHover("show_text", `&cClick here to Cancel!`))
    msg.chat()
}
// --------------------------------------------- //
function repalceIceSpray(msg, ice) {
    msg = msg.replace("UwUaddons » ", "")
             .replace("{t/f}", `${ice ? "T" : "F"}`)
             .replace("{true/false}", `${ice ? "True" : "False"}`)
             .replace("{y/n}", `${ice ? "Y" : "N"}`)
             .replace("{yes/no}", `${ice ? "Yes" : "No"}`)
    return msg
}
// --------------------------------------------- //
function replaceArrows(msg, hits) {
    msg = msg.replace("UwUaddons » ", "")
             .replace("{hit}", `${hits}`)
    return msg
}
// --------------------------------------------- //
function replaceTwilight(msg, twilight) {
    msg = msg.replace("UwUaddons » ", "")
             .replace("{t/f}", `${twilight ? "T" : "F"}`)
             .replace("{true/false}", `${twilight ? "True" : "False"}`)
             .replace("{y/n}", `${twilight ? "Y" : "N"}`)
             .replace("{yes/no}", `${twilight ? "Yes" : "No"}`)
    return msg
}
// -- Azured Client ---------------------------- //
function isDragon(packet) {
    const count = packet.func_149222_k()
    const isLongDistance = packet.func_179750_b()
    const speed = packet.func_149227_j()
    const xOffset = packet.func_149221_g()
    const y = parseInt(packet.func_149226_e())
    const yOffset = packet.func_149224_h()
    const zOffset = packet.func_149223_i()

    return (count == 20 && y == 19 && xOffset == 2 && yOffset == 3 && zOffset == 2 && speed == 0 && isLongDistance)
}
// -- Most from Azured Client ---------------------------- //
function debuffListener() {
    if (listening || (split == 1 && Settings.dragDebuff5)) return
    if (Settings.dragDebuff5) split = 1
    arrowsHit = 0
    // hitIce = 0
    iceSprayHit = false
    listening = true
    arrowListener.register()
    iceSprayListener.register()
    setTimeout(() => {
        hitIcedate = Date.now()
        hitIce = false
        hitLBdate = Date.now()
        hitLB = false
    }, 5000)
    setTimeout(() => {
        arrowListener.unregister()
        iceSprayListener.unregister()
        listening = false
        let twilight = false
        Player.getInventory().getItems().forEach(a => {
            if (a?.getName()?.includes("Twilight Arrow Poison")) twilight = true
        })
        let dragMsg = []
        if (Settings.dragDebuff1 >= 1) {
            dragMsg.push(replaceArrows(dragDebuff1array[Settings.dragDebuff1], arrowsHit))
        }
        if (Settings.dragDebuff2 >= 1) {
            dragMsg.push(repalceIceSpray(dragDebuff2array[Settings.dragDebuff2], iceSprayHit))
        }
        if (Settings.dragDebuff3 >= 1) {
            dragMsg.push(replaceTwilight(dragDebuff3array[Settings.dragDebuff3], twilight))
        }
        if (Settings.dragDebuff4 >= 1) {
            if (Settings.dragDebuff4 == 1) {
                if (hitIce) dragMsg.push(`Ice Spray hit in ${hitIcedate}ms`)
            } else if (Settings.dragDebuff4 == 2) {
                if (hitLB) dragMsg.push(`Arrow hit in ${hitLBdate}ms`)
            } else if (Settings.dragDebuff4 == 3) {
                if (hitIce) dragMsg.push(`Ice Hit in ${hitIcedate}ms`)
                if (hitLB) dragMsg.push(`Arrow hit in ${hitLBdate}ms`)
            }
        }
        if (dragMsg.length <= 0) {
            ChatLib.chat(`${prefix} &cCannot send debuff message as there is no settings toggled.`)
            return
        }
        ChatLib.command("pc " + prefix2 + " " + dragMsg.join(", "))
        dragMsg = []
    }, 6250)
}
// -- Azured Client ---------------------------- //
const arrowListener = register('soundPlay', () => {
    arrowsHit++
    if (!hitLB) {
        hitLBdate = Date.now()-hitLBdate
        hitLB = true
    }
}).setCriteria("random.successful_hit").unregister()
// -- Azured Client ---------------------------- //
const iceSprayListener = register('tick', () => {
    World.getAllEntitiesOfType(Java.type("net.minecraft.entity.item.EntityItem").class).filter(item => item?.getName() == "item.tile.ice").forEach(item => {
        if (item.getY() <= 30 && item.getY() >= 10 && item.distanceTo(Player.asPlayerMP()) <= 25) {
            if (!hitIce) {
                hitIcedate = Date.now()-hitIcedate
                hitIce = true
            }
            iceSprayHit = true
        }
    })
}).unregister()
// --------------------------------------------- //
const dragonS = ["Oh, this one hurts!", "My soul is disposable.", "I have more of those."] // When statue is destroyed
const dragonNS = ["Your skills have faded humans.", "I am not impressed.", "Futile.", "You just made a terrible mistake!"] // When dragon is killed outside of statue
///////////////////////////////////////////////////


///////////\\\\\\\\\\\\\\\\
// Command: Toggle Carry //////////////////////////
register('command', (config) => {
    if (!config) {
        Settings.carryMode = !Settings.carryMode
        ChatLib.chat(`${prefix} ${Settings.carryMode ? "&aCarry Mode Enabled! &8| &7/carrymode {config}" : "&cCarry Mode Disabled! &8| &7/carrymode {config}"}`)
    } else if (config.toLowerCase() == "m7" && Settings.carryMode) {
        Settings.carryModeType = 1
        ChatLib.chat(`${prefix} &aCarry Mode Set to &4[&cM7&4]`)
    } else if (config.toLowerCase() == "m6" && Settings.carryMode) {
        Settings.carryModeType = 2
        ChatLib.chat(`${prefix} &aCarry Mode Set to &4[&cM6&4]`)
    } else if (config.toLowerCase() == "m5" && Settings.carryMode) {
        Settings.carryModeType = 3
        ChatLib.chat(`${prefix} &aCarry Mode Set to &4[&cM5&4]`)
    } else if (config.toLowerCase() == "none" || config.toLowerCase() == "off" && Settings.carryMode) {
        Settings.carryModeType = 0
        ChatLib.chat(`${prefix} &aCarry Mode Set to None`)
    } else {
        ChatLib.chat(`${prefix} &cEnable Carry Mode to change the config!`)
    }
}).setName('ua_command_carrymode').setAliases('carrymode')
///////////////////////////////////////////////////


////////\\\\\\\\\\\\\\\\\
// Chat: Hide Boss MSG ////////////////////////////
registerWhen(register('chat', (event) => {
    if (!Settings.hideBossMSG) return
    cancel(event)
}).setCriteria("[BOSS]${*}:${*}"), () => Settings.hideBossMSG)
///////////////////////////////////////////////////


///////////\\\\\\\\\\\\\
// Command: Set Carry /////////////////////////////
register('command', (ammountCarry) => {
    if (!Settings.carryMode) {ChatLib.chat(`&r&9${line}\n${prefix} &cCarry Mode is disabled!\nUse &o/carrymode&r &fto enable\n&r&9${line}`); return}
    if (!ammountCarry) {
        ChatLib.chat(`${prefix} &fCarry ammount set to &l1`)
        ChatLib.command(`pc ${prefix2} Set carry ammount to 1!`)
        ammountOfCarry.value = 1
        currentCarries.value = 0
        return
    }
    var ammountCarry = Number(ammountCarry)
    if (!Number.isInteger(ammountCarry) || ammountCarry <= 0) {ChatLib.chat(`${prefix} &cInvalid number`); return}

    ChatLib.chat(`${prefix} &fCarry ammount set to &l${ammountCarry}`)
    ChatLib.command(`pc ${prefix2} Set carry ammount to ${ammountCarry}!`)
    ammountOfCarry.value = ammountCarry
    currentCarries.value = 0
}).setName('ua_command_setcarry').setAliases('setcarry')
///////////////////////////////////////////////////


//////////\\\\\\\\\\\\\
// Command: Cancelrq //////////////////////////////
register('command', () => {
    cancelrequeue = true
    ChatLib.chat(`${prefix} &cCancelled Request!`)
}).setName('cancelrq')
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\\\\
// Event: Carry Config ////////////////////////////
registerWhen(register('chat', () => {if (Settings.carryMode && readybefore == false) {readybefore = true; new Message(new TextComponent(`&r&9${line}\n${prefix} &aCarry Mode is Enabled!\n&r &cTo disable type /carrymode or &e[Click Here]\n&r&9${line}`).setClick("run_command", "/carrymode").setHover("show_text", "&f/carrymode")).chat(); ChatLib.command(`pc ${prefix2} Client, please set your class Mage/Berserk`)}}).setCriteria("${*} is now ready!"), () => Settings.carryMode && !readybefore)
registerWhen(register('chat', () => {if (Settings.carryMode) {ChatLib.command(`pc ${prefix2} Client, get milestone 2-3 then go to safe zone`)}}).setCriteria("Starting in 1 second."), () => Settings.carryMode)
registerWhen(register('chat', () => {if (Settings.carryMode && (Settings.carryModeType == 1 || Settings.carryModeType == 3)) {ChatLib.command(`pc ${prefix2} Client, take armour off`)}}).setCriteria("[BOSS] The Watcher: You have proven yourself. You may pass."), () => Settings.carryMode && (Settings.carryModeType == 1 || Settings.carryModeType == 3))
registerWhen(onChatPacket(() => {if (Settings.carryMode && Settings.carryModeType == 1) {ChatLib.command(`pc ${prefix2} Client, Stand infront of Maxor`)}}).setCriteria("[BOSS] Maxor: WELL! WELL! WELL! LOOK WHO'S HERE!"), () => Settings.carryMode && Settings.carryModeType == 1)
registerWhen(onChatPacket(() => {if (Settings.carryMode && Settings.carryModeType == 2) {ChatLib.command(`pc ${prefix2} Client, Go to middle`)}}).setCriteria("[BOSS] Sadan: So you made it all the way here... Now you wish to defy me? Sadan?!",), () => Settings.carryMode && Settings.carryModeType == 2)
registerWhen(onChatPacket(() => {if (Settings.carryMode && Settings.carryModeType == 3) {ChatLib.command(`pc ${prefix2} Client, Hide or stay next to portal`)}}).setCriteria("[BOSS] Livid: Welcome, you've arrived right on time. I am Livid, the Master of Shadows.",), () => Settings.carryMode && Settings.carryModeType == 3)
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\\\
// Event: Blood Ready /////////////////////////////
registerWhen(onChatPacket(() => {
    if (Settings.bloodReady) {
        Client.showTitle("&cBlood Ready!", "", 0, 70, 0)
        if (Settings.bloodReadyParty) {
            ChatLib.command(`pc ${prefix2} Blood Ready!`)
        }
    }
}).setCriteria("[BOSS] The Watcher: That will be enough for now."), () => Settings.bloodReady)
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\\
// Event: Blood Done //////////////////////////////
registerWhen(onChatPacket(() => {
    if (Settings.bloodDone) {
        Client.showTitle("&cBlood Done!", "", 0, 70, 0)
        if (Settings.bloodDoneParty) {
            ChatLib.command(`pc ${prefix2} Blood Done!`)
        }
    }
}).setCriteria("[BOSS] The Watcher: You have proven yourself. You may pass."), () => Settings.bloodDone)
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\\\\
// Event: Wither Stuck ////////////////////////////
function colourFunc() {
    if (Settings.stuckColour < 10)
        return Settings.stuckColour
    if (Settings.stuckColour == 10)
        return "a"
    else if (Settings.stuckColour == 11)
        return "b"
    else if (Settings.stuckColour == 12)
        return "c"
    else if (Settings.stuckColour == 13)
        return "d"
    else if (Settings.stuckColour == 14)
        return "e"}
function witherstuck() {if (!Settings.witherstuckNotify) return; let col = colourFunc(); Client.Companion.showTitle(`&${col}Wither Stuck!`, "", 10, 40, 10);}
onChatPacket(() => {witherstuck()}).setCriteria("[BOSS] Storm: Ouch, that hurt!")
onChatPacket(() => {witherstuck()}).setCriteria("[BOSS] Maxor: YOU TRICKED ME!")
onChatPacket(() => {witherstuck()}).setCriteria("[BOSS] Maxor: THAT BEAM! IT HURTS! IT HURTS!!")
onChatPacket(() => {witherstuck()}).setCriteria("[BOSS] Storm: Oof")
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\\\\\\
// Event: Hide Milestone //////////////////////////
registerWhen(register('chat', (classs, event) => {
    if (Settings.hideMilestone) {
        cancel(event)
    }
}).setCriteria(/(Healer|Archer|Berserk|Mage|Tank) Milestone .: You have .+ so far! .+/), () => Settings.hideMilestone)
///////////////////////////////////////////////////


////////////////\\\\\\
// Chat Command: DT ///////////////////////////////
registerWhen(register('chat', (rank, name, dt, reason) => {
    if (!Settings.dtCommand) return
    if (downtimedemon == "") {
        downtimedemon = name
        downtimereason = reason
        ChatLib.command(`pc ${prefix2} ${name} has requested downtime`)
    } else {
        ChatLib.command(`pc ${prefix2} ${downtimedemon} has already requested downtime`) 
    }
}).setCriteria(/Party > (\[.+\])? ?(.+) ?[ቾ⚒]?: !([Dd][Tt]|[Dd][Oo][Ww][Nn][Tt][Ii][Mm][Ee]) ?(.+)?/), () => Settings.dtCommand)
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\\
// Event: End of run //////////////////////////////
registerWhen(onChatPacket(() => {
    cancelrequeue = false
    let goinSeconds = (Settings.dtCommmandAutoGoTime*1000)-(2000)-800
    setTimeout(() => {
        if (bossKilled) {
            if (downtimedemon != "") {
                if (downtimereason == "") {downtimereason = "Unspecified"}
                Client.showTitle("&cDowntime Needed!", "", 0, 75, 0)
                ChatLib.command(`pc ${prefix2} ${downtimedemon} has requested downtime: ${downtimereason}`)
                ChatLib.chat(`&r&9${line}\n${prefix} &f${downtimedemon} has requested downtime: ${downtimereason}\n&r&9${line}`)
            }
            if (Settings.carryMode) {
                currentCarries.value += 1
                if (currentCarries.value == ammountOfCarry.value) {
                    ChatLib.command(`pc ${prefix2} Your requested ammount of carries has been fulfilled!`)
                    ChatLib.chat(`&r&9${line}\n${prefix} &a${currentCarries.value}/${ammountOfCarry.value} carries!\n&r&9${line}`)
                    currentCarries.value = 0
                    ammountOfCarry.value = 1
                } else {
                    ChatLib.command(`pc ${prefix2} ${currentCarries.value}/${ammountOfCarry.value} carries!`)
                    ChatLib.chat(`&r&9${line}\n${prefix} &f${currentCarries.value}/${ammountOfCarry.value} carries!\n&r&9${line}`)
                }
            }
            if (!party.getLeader() || (currentCarries.value == 0 && Settings.carryMode) || !downtimedemon == "") return
            if (Settings.dtCommandAutoGo) {
                cancelrq()
                setTimeout(() => {if (cancelrequeue) return; ChatLib.command(`instancerequeue`)}, goinSeconds)
            } else {
                reinstance()
            }
        }
    }, 800)
}).setCriteria(/^\s*> EXTRA STATS <$/), () => Settings.dtCommand || Settings.dtCommandAutoGo || Settings.carryMode)
///////////////////////////////////////////////////


/////////\\\\\\\\\\\
// Event: Rag Axe /////////////////////////////////
registerWhen(onChatPacket((event) => {
    if (!Settings.ragAxeAlert) return
    notePling.value = true
    Client.showTitle("&6Ooga Booga", "", 0, 50, 5)
}).setCriteria("[BOSS] Wither King: I no longer wish to fight, but I know that will not stop you."), () => Settings.ragAxeAlert)
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\\\
// Event: Boss Killed /////////////////////////////
registerWhen(onChatPacket((boss, time, pb) => {
    bossKilled = true
}).setCriteria(/^\s*☠ Defeated (.+) in 0?([\dhms ]+?)\s*(\(NEW RECORD!\))?$/), () => Settings.dtCommand || Settings.dtCommandAutoGo || Settings.carryMode)
///////////////////////////////////////////////////


/////////\\\\\\\\\\
// Event: Unload //////////////////////////////////
register(`worldUnload`, () => {
    bossKilled = false
    readybefore = false
    cancelrequeue = false
    isInP5 = false
    downtimedemon = ""
    downtimereason = ""
    hitIce = false
    hitIcedate = 0
    hitLB = false
    hitLBdate = 0
    split = 0
})
///////////////////////////////////////////////////



/////////////// FULL credit: Azured Client \\\\\\\\\\\\\\\
// https://www.chattriggers.com/modules/v/azuredclient

/////////\\\\\\\\
// Event: inP5 //////////////////////////////////
onChatPacket(() => {
    isInP5 = true
}).setCriteria("[BOSS] Wither King: You... again?")
///////////////////////////////////////////////////


/////////\\\\\\\\\\\
// Pakcet: Dragon //////////////////////////////////
registerWhen(register("packetReceived", (packet) => {
    if (packet.func_179749_a().toString() != "FLAME") return
    if (!isDragon(packet)) return
    if (Settings.dragDebuff0) debuffListener()
}).setFilteredClass(S2APacketParticles), () => isInP5)
///////////////////////////////////////////////////


///////////////////////////// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\