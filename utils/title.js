let timer = new Text('').setScale(5).setShadow(true).setAlign('CENTER')
let titleHeight = 80
let stringInput = ""
let ticks = 0
let a = 0
let b = 0

/**
 * Displays a secondary title
 * 
 * @param {Number} ticks - How many seconds (20ticks = 1second)
 * @param {Number} scale
 * @param {String} text
 */
export function displayTitle(tks, scale, text, height=80) {
    titleHeight = height
    timer.setScale(scale)
    ticks = tks
    stringInput = text
    tickCounter.register()
    stringOverlay.register()
}

/**
 * Displays a timer
 * 
 * @param {Number} ticks - How many seconds (20ticks = 1second)
 * @param {Number} scale
 */
export function displayTimerTitle(tks, scale, height=80) {
    titleHeight = height
    timer.setScale(scale)
    ticks = tks
    tickCounter.register()
    timerOverlay.register()
}

const tickCounter = register('packetReceived', (packet) => {
    ticks--
    if (ticks <= 0) tickCounter.unregister()
}).setFilteredClass(Java.type("net.minecraft.network.play.server.S32PacketConfirmTransaction")).unregister()

function unreg() {
    timer.setScale(3)
    ticks = 0
    a = 0
    stringInput = ""
}

const stringOverlay = register('renderOverlay', () => {
    a = (ticks / 20).toFixed(3);
    timer.setString(`${stringInput}`);
    timer.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 - titleHeight);
    if (a <= 0) {unreg(); stringOverlay.unregister()}
}).unregister()

const timerOverlay = register('renderOverlay', () => {
    b = (ticks / 20).toFixed(3)
    let formattedTime = b >= (((60 * 50) / 100) / 20) ? `&a${b}` : (b >= (((60 * 25) / 100) / 20) ? `&e${b}` : `&c${b}`)
    timer.setString(formattedTime)
    timer.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 - titleHeight)
    if (b <= 0) {unreg(); timerOverlay.unregister()}
}).unregister()


register(`worldUnload`, () => {
    if (a != 0) stringOverlay.unregister()
    if (b != 0) timerOverlay.unregister()
})