import Settings from "../config";
import { inGoldor, pre4complete } from "../features/Dungeons/Device/DungDevice";
import { ammountOfCarry, currentCarries } from "../features/Dungeons/General/DungGeneral";
import { getDataJson } from "./Utils";

// Constants
const bow = new Item("bow");

// Flags
let canDrag = false;

// Data
// let data = getDataJson

// Functions
function renderExampleText(coords, exampleText) {
    const scale = coords.scale;
    const x = coords.x;
    const y = coords.y;
    const xScale = x / scale;
    const yScale = y / scale;

    Renderer.scale(scale / 2);
    Renderer.drawString(`&b[x: ${Math.round(x)}, y: ${Math.round(y)}, scale (scroll): ${scale.toFixed(2)}]`, xScale * 2, yScale * 2 + 15);
    Renderer.scale(scale);
    Renderer.drawString(exampleText, xScale, yScale, true);
}

function renderText(coords, text) {
    const scale = coords.scale;
    const x = coords.x;
    const y = coords.y;
    const xScale = x / scale;
    const yScale = y / scale;

    Renderer.scale(scale);
    Renderer.drawString(text, xScale, yScale, true);
}

function renderIcon(coords, icon, ax, ay, guiType) {
    const scale = coords.scale;
    const x = coords.x;
    const y = coords.y;

    icon.draw(x - ax * scale, y - ay * scale, scale);
}

function handleDragged(coords, x, y, guiType) {
    let data = updateData()
    coords.x = x;
    coords.y = y;
    let existingData = JSON.parse(FileLib.read("UwUaddons", "data.json"));
    existingData.guiLocs[guiType] = data.guiLocs[guiType];
    data.save()
}

function handleScroll(coords, direction, guiType) {
    let data = updateData()
    if (direction == 1) {
        coords.scale += coords.scale < 10 ? 0.1 : 0;
    } else if (direction == -1) {
        coords.scale -= coords.scale > 0 ? 0.1 : 0;
    }
    let existingData = JSON.parse(FileLib.read("UwUaddons", "data.json"));
    existingData.guiLocs[guiType] = data.guiLocs[guiType];
    data.save()
}

const carryModeText = {
    1: "&4[&cM7&4]",
    2: "&4[&cM6&4]",
    3: "&4[&cM5&4]",
    0: "&7[&fNone&7]",
}

let lastUpdated
let lastData

function updateData() {
    if (!lastUpdated || lastUpdated > Date.now() + 500) {
        lastUpdated = Date.now()
        lastData = getDataJson
    }
    return lastData
}

// Event Handlers
register("renderOverlay", () => {
    data = updateData()
    // +--- Pre 4 ---+ \\
    if (Settings.GUISpre4Status) {
        if (Settings.GUIpre4Status.isOpen()) {
            renderExampleText(data.guiLocs.pre4Status, `&cPre 4 Incomplete`);
            renderIcon(data.guiLocs.pre4Status, bow, 18, 4);
        } else {
            if (inGoldor.value == true) {
                renderText(data.guiLocs.pre4Status, `${pre4complete.value == true ? "&aPre 4 Completed" : "&cPre 4 Incomplete"}`);
                renderIcon(data.guiLocs.pre4Status, bow, 18, 4);
            }
        }
    }
    // +--- Carry Count ---+ \\
    if (Settings.GUIScarryCount) {
        if (Settings.GUIcarryCount.isOpen()) {
            renderExampleText(data.guiLocs.carryCount, `&4[&cM6&4] &f1/5`);
        } else {
            if (!Settings.carryMode) return
            renderText(data.guiLocs.carryCount, (carryModeText[Settings.carryModeType] || "") + ` &f${currentCarries.value}/${ammountOfCarry.value}`)
        }
    } /** else if (Settings.GUIS) { // +--- GUI ---+ \\

    }*/
});



register('dragged', (dx, dy, x, y, button) => {
    if (!canDrag) return;

    // +--- Pre 4 ---+ \\
    if (Settings.GUISpre4Status) {
        if (Settings.GUIpre4Status.isOpen()) {
            handleDragged(data.guiLocs.pre4Status, x, y, "pre4Status");
            return;
        }
    }
    // +--- Carry Count ---+ \\
    if (Settings.GUIScarryCount) {
        if (Settings.GUIcarryCount.isOpen()) {
            handleDragged(data.guiLocs.carryCount, x, y, "carryCount");
            return;
        }
    }
    // +--- GUI ---+ \\
    /** else if (Settings.GUIS) { // +--- GUI ---+ \\

    }*/
});

register('scrolled', (x, y, direction) => {
    // +--- Pre 4 ---+ \\
    if (Settings.GUISpre4Status) {
        if (Settings.GUIpre4Status.isOpen()) {
            handleScroll(data.guiLocs.pre4Status, direction, "pre4Status");
            return;
        }
    }
    // +--- Carry Count ---+ \\
    if (Settings.GUIScarryCount) {
        if (Settings.GUIcarryCount.isOpen()) {
            handleScroll(data.guiLocs.carryCount, direction, "carryCount");
            return;
        }
    }
    // +--- GUI ---+ \\
    /** else if (Settings.GUIS) {

    }*/
});

register("guiOpened", () => {
    setTimeout(() => {
        canDrag = true;
    }, 1000);
});

register("guiClosed", () => {
    canDrag = false;
});