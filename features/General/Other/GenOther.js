
import Settings from "../../../config";
import party from "../../../utils/party";
import { registerWhen } from '../../../../BloomCore/utils/Utils'
import { displayTimerTitle, displayTitle } from "../../../utils/title";
import { line, prefix } from "../../../utils/Utils";

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Variables //////////////////////////////////////
let rogueSword = 0 //                            \\
///////////////////////////////////////////////////
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


/////////\\\\\\\\\\\\\\\
// Event: Auto Chat p /////////////////////////////
registerWhen(register("chat", () => ChatLib.command('chat p')).setCriteria(/You have joined (.+)('|'s)? party!/), () => Settings.chatp, !party.chatp)
registerWhen(register("chat", (player) => {if (!player == Player.getName()) return; ChatLib.command('chat p')}).setCriteria(/(\w{1,16}) invited .+ to the party! They have 60 seconds to accept./), () => Settings.chatp, !party.chatp)
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\\\\\\\\\\\
// Event: Ragnarock Axe Timer /////////////////////
registerWhen(register("soundPlay", (pos, name, vol, pitch, category, event) => {
    if (pitch == 1.4920635223388672 && Settings.ragAxeTimer) {
        displayTimerTitle(200, 1, -20)
    }
}).setCriteria("mob.wolf.howl"), () => Settings.ragAxeTimer)
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\\\\\\\\\\\
// Event: End Stone Sword /////////////////////
registerWhen(register("chat", () => {
    displayTimerTitle(100, 1, -40)
}).setCriteria("Used Extreme Focus! (${mana} Mana)"), () => Settings.ragAxeTimer)
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\\\\
// Event: Spring Boots /////////////////////
let ticks = 0
let a = 0
const tickCounter = register('packetReceived', (packet) => {
    ticks++
    if (!Player.isSneaking()) stopwatchOverlay.unregister()
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")).unregister()
const stopwatchOverlay = register('renderOverlay', () => {
    a = (ticks / 20).toFixed(3)
    let timer = new Text('').setScale(2).setShadow(true).setAlign('CENTER')
    timer.setString(`&a${a}`)
    timer.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 - 20)
    if (!Player.isSneaking()) stopwatchOverlay.unregister()
}).unregister()
registerWhen(register("soundPlay", (pos, name, vol, pitch, category, event) => {
    if ((name == "fireworks.launch" && pitch == 1.6984126567840576) || (name == "random.eat" && pitch ==  0.095238097012043) && Settings.springBoot) {
        tickCounter.unregister()
        stopwatchOverlay.unregister()
    }
}), () => Settings.springBoot)
registerWhen(register("soundPlay", (pos, name, vol, pitch, category, event) => {
    Player.armor?.getBoots()?.getLore()?.forEach(line => {
        if (line.includes("Ability: To the Moon!")) return
    })
    if (pitch == 0.6984127163887024 && Settings.springBoot ) {
        ticks = 0
        tickCounter.register()
        stopwatchOverlay.register()
    }
}).setCriteria("note.pling"), () => Settings.springBoot)
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\\\
// Event: Rogue Sword /////////////////////////////
registerWhen(register("soundPlay", (pos, name, vol, pitch, category, event) => {
    if (name == "liquid.lavapop" && vol == 0.4000000059604645 && Settings.rogueSword) {
        if (rogueSword == 1) return
        rogueSword = 1
        setTimeout(() => {
            rogueSword = 0
            World.playSound("note.pling", 1.0, 2.0)
            displayTitle(70, 3, "&aRogue Sword Ready!", 50)
        }, (Settings.rogueSwordTimer*1000))
    }
}).setCriteria("liquid.lavapop"), () => Settings.rogueSword)
///////////////////////////////////////////////////


////////\\\\\\\\\\\\\\\\\
// Chat: Tac Insersion ////////////////////////////
registerWhen(register("soundPlay", (pos, name, vol, pitch, category, event) => {
    if (name == "fire.ignite" && pitch == 0.7460317611694336 && Settings.tacIns) {
        displayTimerTitle(60, 2, 20)
    }
}).setCriteria("fire.ignite"), () => Settings.tacIns)
///////////////////////////////////////////////////


////////\\\\\\\\\\\\\\
// Chat: Robot Part ///////////////////////////////
register('command', (plot) => {
    ChatLib.command(`tptoplot ${plot}`)
}).setName('ua_command_plottp').setAliases('tpp').setAliases('plot')
///////////////////////////////////////////////////


/////////\\\\\\\\\\\\\\
// Event: Soopy Ping //////////////////////////////
registerWhen(register('chat', (event) => {
    cancel(event)
}).setCriteria("Unknown command. Type \"/help\" for help. ('uhfdsolguhkjdjfhgkjhdfdlgkjhldkjhlkjhsldkjfhldshkjf')"), () => Settings.soopyPing)
///////////////////////////////////////////////////


////////\\\\\\\\\\\\\\
// Chat: Jungle Key ///////////////////////////////
register("chat", (event) => {
    cancel(event)
    keyStr = "Jungle Key"
    msg = new Message(new TextComponent(`&r&e[NPC] &r&bKalhuiki Door Guardian&r&f: &r&fThis temple is locked, you will need to bring me a key to open the door!&r\n${prefix} &eClick to buy a jungle key`).setClick("run_command", `/bazaar ${keyStr}`).setHover("show_text", `${prefix} &f/bazaar ${keyStr}`))
    msg.chat()
}).setCriteria("[NPC] Kalhuiki Door Guardian: This temple is locked, you will need to bring me a key to open the door!")
///////////////////////////////////////////////////


////////\\\\\\\\\\\\\\
// Chat: Coords ///////////////////////////////
register('command', () => {
    ChatLib.say(`x: ${Math.round(Player.getX())}, y: ${Math.round(Player.getY())}, z: ${Math.round(Player.getZ())}`)
}).setName('ua_command_coords').setAliases("coords")
///////////////////////////////////////////////////


/////////\\\\\\\\\\
// Event: Unload //////////////////////////////////
register(`worldUnload`, () => {
    stopwatchOverlay.unregister()
    tickCounter.unregister()
})
///////////////////////////////////////////////////