import Settings from "../../../config";
import { registerWhen } from "../../../../BloomCore/utils/Utils";
import { prefix2 } from "../../../utils/Utils";

////////\\\\\\\\\\\\\
// Chat: Dug Coins ////////////////////////////////
registerWhen(register("chat", (coinage) => {
    if (!Settings.dianaTreasure) return
    Client.showTitle(`&e&lTreasure!`, `&6+ ${coinage}`,  2, 30, 2)
    if (!Settings.dianaTreasureParty) return
    if ((Settings.dianaTreasureParty50k && coinage == "50,000") || (Settings.dianaTreasureParty100k && coinage == "100,000") || (Settings.dianaTreasureParty250k && coinage == "250,000") || (Settings.dianaTreasureParty500k && coinage == "500,000") || (Settings.dianaTreasureParty750k && coinage == "750,000")) {
        ChatLib.command(`pc ${prefix2} Wow! You dug out ${coinage} coins!`)
    }
}).setCriteria("Wow! You dug out ${coinage} coins!"), () => Settings.dianaTreasure)
///////////////////////////////////////////////////