import Settings from "../../../config";
import { registerWhen } from "../../../../BloomCore/utils/Utils";

////////\\\\\\\\\\\\\\\\\\
// Chat: Dug Inquisitor ///////////////////////////
registerWhen(register("chat", () => {
    if (!Settings.dianaInq) return
    ChatLib.command(`pc ${Settings.dianaInqText}`)
}).setCriteria("${*} You dug out a Minos Inquisitor!"), () => Settings.dianaInq || (Settings.uwuify && Settings.uwuInq))
///////////////////////////////////////////////////