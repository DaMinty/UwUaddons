
import Settings from "../../../config";
import { registerWhen } from '../../../../BloomCore/utils/Utils'

///////////\\\\\\\\
// Command: Aura //////////////////////////////////
registerWhen(register('chat', (na, user, faction, prefixcmd, user2) => {
    if (!Settings.aura) return
    if (prefixcmd != Settings.prefixPC) return
    let aura = Math.round(Math.random() * 100)
    setTimeout(() => {
        const target = user2 || user
        const auraMessage = aura === 100 ? `MAX AURA GG` : aura === 0 ? `no aura L` : `${aura}% aura`
        ChatLib.command(`pc ${target} has ${auraMessage}`)
    }, 300)
}).setCriteria(/Party > (\[.+\])? ?(.+) ?([ቾ⚒])?: (.+)[Aa][Uu][Rr][Aa] ?(.+)?/), () => Settings.aura)
///////////////////////////////////////////////////