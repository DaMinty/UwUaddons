
import Settings from "../../../config";
import { registerWhen } from "../../../../BloomCore/utils/Utils";

registerWhen(register("chat", (player, complete, devterm) => { // , number1, number2
    if (devterm == "terminal") {
        if (Settings.uwuify && Settings.uwuTerminals) {new Sound({source: "uwu.ogg"})?.play();}
    } else if (devterm == "device") {
        if (Settings.uwuify && Settings.uwuDevice) {new Sound({source: "uwu.ogg"})?.play();}
    }
}).setCriteria(/(\w{1,16}) (.+) a (lever||device||terminal)! \((\d)\/((7||8))\)/), () => Settings.uwuify && (Settings.uwuTerminals || Settings.uwuDevice))
registerWhen(register("chat", () => {if (Settings.uwuify && Settings.uwuDeath) {new Sound({source: "uwu.ogg"})?.play();}}).setCriteria(" ☠ ${*} and became a ghost."), () => Settings.uwuify && Settings.uwuDeath)
registerWhen(register("chat", () => {if (Settings.uwuify && Settings.uwuMessage) {new Sound({source: "uwu.ogg"})?.play();}}).setCriteria(/(Party >|\[\d+\]|Guild >|From|To|Co-op >)(.+): (.+)?[Uu][Ww][Uu]([ ].+)?/), () => Settings.uwuify && Settings.uwuMessage)
registerWhen(register("chat", () => {if (Settings.uwuify && Settings.uwuInq) {new Sound({source: "uwu.ogg"})?.play()}}).setCriteria("${*} You dug out a Minos Inquisitor!"), () => Settings.uwuify && Settings.uwuInq)