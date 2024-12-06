
import Promise from "../../../../PromiseV2";
import PriceUtils from "../../../../BloomCore/PriceUtils";
import Settings from "../../../config";
import { getElectionDataV2 } from "../../../../BloomCore/utils/APIWrappers";
import { prefix } from "../../../utils/Utils";
import { registerWhen } from "../../../../BloomCore/utils/Utils";

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Variables //////////////////////////////////////
let lastUpdated = 0 //                           \\
let lastUpdatedMayor = 0 //                      //
let lastMayor = "" //                            \\
let lastPrice = 0 //                             //
///////////////////////////////////////////////////
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//\\\\\\\\\\\\\
// Functions //////////////////////////////////////
function getMayor() {
    Promise.all([
        getElectionDataV2()
    ]).then(values => {
        const [electionData] = values
        lastMayor = String(electionData.mayor.name)
    }).catch(e => ChatLib.chat(`${prefix} &c${e}`))
}
// --------------------------------------------- //
function getPrice() {
    Promise.all([
        PriceUtils.getSellPrice("STOCK_OF_STONKS"),
    ]).then(values => {
        const [sellPrice] = values
        lastPrice = sellPrice
    }).catch(e => ChatLib.chat(`${prefix} &c${e}`))
}
// --------------------------------------------- //
function getAPI(type) {
    if (type == 0) { // Price
        if (lastUpdated == 0 || lastUpdated > Date.now() + 500) {
            lastUpdated = Date.now()
            getPrice()
            return lastPrice
        } else if ((lastUpdated < Date.now()) + 500) {
            return lastPrice
        }
    } else if (type == 1) { // Mayor
        if (lastUpdatedMayor == 0 || lastUpdatedMayor > Date.now() + 5000) {
            lastUpdatedMayor = Date.now()
            getMayor()
            return lastMayor
        } else if ((lastUpdatedMayor < Date.now()) + 5000) {
            return lastMayor
        }
    }
}
///////////////////////////////////////////////////


/////////////\\\\\\\\\\\\\\\\ Sorry its messy :sob:
// Item Lore: Price Update ////////////////////////
registerWhen(register("itemTooltip", (lore, item, event) => {
    if (!item.getName().includes("Stonks Auction")) return
    getAPI(1)
    if (lastMayor == "Diaz") {
        let originalLore = item.getLore()

        let modifiedLore = []
        let modified = false

        let priceStock = getAPI(0)
        let topPositions = {
            "§5§o§7§7▶ §c§lTOP 100§7 - §5Stock of Stonks §8x25":` &7- &e${(Math.floor(priceStock * 25).toLocaleString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} coins`,
            "§5§o§7§7▶ §c§lTOP 500§7 - §5Stock of Stonks §8x15":` &7- &e${(Math.floor(priceStock * 15).toLocaleString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} coins`,
            "§5§o§7§7▶ §c§lTOP 1,000§7 - §5Stock of Stonks §8x10":` &7- &e${(Math.floor(priceStock * 10).toLocaleString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} coins`,
            "§5§o§7§7▶ §c§lTOP 2,500§7 - §5Stock of Stonks §8x5":` &7- &e${(Math.floor(priceStock * 5).toLocaleString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} coins`,
            "§5§o§5§o§7§7▶ §c§lTOP 5,000§7 - §5Stock of Stonks §8x2":` &7- &e${(Math.floor(priceStock * 2).toLocaleString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} coins`,
            "§5§o§5§o§7§7▶ §c§lEVERYONE ELSE§7 - §5Stock of Stonks §8x1":` &7- &e${(Math.floor(priceStock * 1).toLocaleString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} coins`,
            "§5§o§7§a▶ §a§lTOP 100§7 - §5Stock of Stonks §8x25":` &7- &e${(Math.floor(priceStock * 25).toLocaleString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} coins`,
            "§5§o§7§a▶ §a§lTOP 500§7 - §5Stock of Stonks §8x15":` &7- &e${(Math.floor(priceStock * 15).toLocaleString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} coins`,
            "§5§o§7§a▶ §a§lTOP 1,000§7 - §5Stock of Stonks §8x10":` &7- &e${(Math.floor(priceStock * 10).toLocaleString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} coins`,
            "§5§o§7§a▶ §a§lTOP 2,500§7 - §5Stock of Stonks §8x5":` &7- &e${(Math.floor(priceStock * 5).toLocaleString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} coins`,
            "§5§o§5§o§7§a▶ §a§lTOP 5,000§7 - §5Stock of Stonks §8x2":` &7- &e${(Math.floor(priceStock * 2).toLocaleString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} coins`,
            "§5§o§5§o§7§a▶ §a§lEVERYONE ELSE§7 - §5Stock of Stonks §8x1":` &7- &e${(Math.floor(priceStock * 1).toLocaleString()).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} coins`
        }

        originalLore.forEach(line => {
            let modifiedLine = line
            if (line.includes("Stonks Auction") || line.includes("minecraft:") || line.includes("NBT:")) return
            Object.keys(topPositions).forEach(key => {
                if (line == key) {
                    modifiedLine += line.replace(key, topPositions[key])
                    modified = true
                }
            })
            modifiedLore.push(modifiedLine)
        })
    
        if (modified) {
            item.setLore(modifiedLore)
        }
    }
}), () => Settings.stockPrices)
///////////////////////////////////////////////////