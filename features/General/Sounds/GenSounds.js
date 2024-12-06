
import Settings from "../../../config";
import { playSnd, prefix } from "../../../utils/Utils"
import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { getDataJson } from "../../../utils/Utils";

//\\\\\\\\\\\\\
// Functions //////////////////////////////////////
export function getArea() {
    let area = 'null'
    try {
        TabList?.getNames()?.forEach(line => {
            let match = line.removeFormatting().match(/Area: (.+)/)
            if (line.removeFormatting() == 'Dungeon: Catacombs') area = 'Dungeons'
            if (!match) return
            area = match[1]
        })
    } catch (e) { }
    return area
}
///////////////////////////////////////////////////


////////\\\\\\\\\\\\\\
// Sound: Etherwarp ///////////////////////////////
registerWhen(register("soundPlay", (pos, name, vol, pitch, category, event) => {
    if (name == "mob.enderdragon.hit" && pitch == 0.5396825671195984 && Settings.etherWarpSound) {
        cancel(event)
        playSnd(Settings.cesSound, 1, Settings.cesSoundPitch)
    }
}).setCriteria("mob.enderdragon.hit"), () => Settings.etherWarpSound)
///////////////////////////////////////////////////


////////\\\\\\\\\\\\\\
// Sound: Bat Death ///////////////////////////////
registerWhen(register("soundPlay", (pos, name, vol, pitch, category, event) => {
    if ((name == "mob.bat.hurt" && vol == 0.10000000149011612) || name == "mob.bat.death") {
        if (Settings.secretBat1) {
            ChatLib.chat(`${prefix} &aBat Death Detected`)
        }
        if (Settings.secretBat2) {
            Client.showTitle("&aBat Killed!", "", 0, 30, 0)
        }
    }
}), () => Settings.secretBat0 && getArea() == "Dungeons")
///////////////////////////////////////////////////


////////\\\\\\\
// Chat: MSB //////////////////////////////////////
const miningAbilities = [
    "Mining Speed Boost is now available!",
    "Maniac Miner is now available!",
    "Pickobulus is now available!",
    "Anomalus Desire is now available!",
    "Sheer Force is now available!",
    "Gemstone Infusion is now available!"
]
miningAbilities.forEach(criteria => {
    register("chat", () => {
        if (Settings.msbAreaDH && (getArea() != 'Dwarven Mines' && getArea() != 'Crystal Hollows')) return
        if (!Settings.msbAlert) return
        playSnd(Settings.msbSound, 1, Settings.msbSoundPitch)
    }).setCriteria(criteria)
})
///////////////////////////////////////////////////


registerWhen(register("soundPlay", (_, __, ___, ____, _____, event) => cancel(event)).setCriteria("step.cloth"), () => Settings.muteWalking)
registerWhen(register("soundPlay", (_, __, ___, ____, _____, event) => cancel(event)).setCriteria("step.grass"), () => Settings.muteWalking)
registerWhen(register("soundPlay", (_, __, ___, ____, _____, event) => cancel(event)).setCriteria("step.gravel"), () => Settings.muteWalking)
registerWhen(register("soundPlay", (_, __, ___, ____, _____, event) => cancel(event)).setCriteria("step.ladder"), () => Settings.muteWalking)
registerWhen(register("soundPlay", (_, __, ___, ____, _____, event) => cancel(event)).setCriteria("step.sand"), () => Settings.muteWalking)
registerWhen(register("soundPlay", (_, __, ___, ____, _____, event) => cancel(event)).setCriteria("step.snow"), () => Settings.muteWalking)
registerWhen(register("soundPlay", (_, __, ___, ____, _____, event) => cancel(event)).setCriteria("step.stone"), () => Settings.muteWalking)
registerWhen(register("soundPlay", (_, __, ___, ____, _____, event) => cancel(event)).setCriteria("step.wood"), () => Settings.muteWalking)
registerWhen(register("soundPlay", (_, __, ___, ____, _____, event) => cancel(event)).setCriteria("mob.ghast.affectionate_scream"), () => Settings.muteGhast)
registerWhen(register("soundPlay", (_, __, ___, ____, _____, event) => cancel(event)).setCriteria("mob.ghast.charge"), () => Settings.muteGhast)
registerWhen(register("soundPlay", (_, __, ___, ____, _____, event) => cancel(event)).setCriteria("mob.ghast.moan"), () => Settings.muteGhast)
registerWhen(register("soundPlay", (_, __, ___, ____, _____, event) => cancel(event)).setCriteria("mob.ghast.scream"), () => Settings.muteGhast)
registerWhen(register("soundPlay", (_, __, ___, ____, _____, event) => cancel(event)).setCriteria("portal.portal"), () => Settings.mutePortal)
registerWhen(register("soundPlay", (_, __, ___, ____, _____, event) => cancel(event)).setCriteria("portal.travel"), () => Settings.mutePortal)
registerWhen(register("soundPlay", (_, __, ___, ____, _____, event) => cancel(event)).setCriteria("portal.trigger"), () => Settings.mutePortal)