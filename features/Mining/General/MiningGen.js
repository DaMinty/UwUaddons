
import Settings from "../../../config";
import { registerWhen } from '../../../../BloomCore/utils/Utils';

////////\\\\\\\\\\\\\\
// Chat: Robot Part ///////////////////////////////
registerWhen(register("chat", (na, item, placeholder, item2, event) => {
    if (!Settings.robotPart) return
    cancel(event)
    if (item.includes("NPC")) {
        msg = new Message(
            new TextComponent(`&r&e[NPC] Professor Robot&r&f: &r&fThat's not one of the components I need! Bring me one of the missing components:&r`),
            new TextComponent(`\n  &9${item2}&r`),
            new TextComponent(` &6[&eBazaar&6]&r`).setClick("run_command", `/bazaar ${item2}`).setHover("show_text", `${prefix} &f/bazaar ${item2}`),
            new TextComponent(` &6[&eSACK&6]&r`).setClick("run_command", `/gfs ${item2} 1`).setHover("show_text", `${prefix} &f/gfs ${item2} 1`)
        )
    } else {
        msg = new Message(
            new TextComponent(`  &9${item}&r`),
            new TextComponent(` &6[&eBazaar&6]&r`).setClick("run_command", `/bazaar ${item}`).setHover("show_text", `${prefix} &f/bazaar ${item}`),
            new TextComponent(` &6[&eSack&6]&r`).setClick("run_command", `/gfs ${item} 1`).setHover("show_text", `${prefix} &f/gfs ${item} 1`)
        )
    }
    msg.chat()
}).setCriteria(/^(\s\s)?(Electron Transmitter|FTX 3070|Robotron Reflector|Superlite Motor|Control Switch|Synthetic Heart|\[NPC\] Professor Robot: That's not the final component! Bring me (a|an) (.+) to gain access to Automaton Prime's storage container!)$/), () => Settings.robotPart)
///////////////////////////////////////////////////