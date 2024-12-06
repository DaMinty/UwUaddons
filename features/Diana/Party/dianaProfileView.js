import Settings from "../../../config";
import axios from "../../../../axios";
import { prefix } from "../../../utils/Utils";
import { decodeNumeral, registerWhen } from "../../../../BloomCore/utils/Utils";
import { stripRank } from "../../../utils/player";

// Got from Volcaddons but changed a bit ty pookie bear uwu :)

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// Variables //////////////////////////////////////
// let ancestrialSpade // Add if in hotbar maybe \\
let rat //                                       //
let griffin //                                   \\
let griffinRare //                               //
let dae //                                       \\
let hype //                                      //
let eman //                                      \\
let claymore //                                  //
let midas_spoon //                               \\
let looting //                                   //
let chimera //                                   \\
let divineGift //                                //
///////////////////////////////////////////////////
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


//\\\\\\\\\\\\\\\\\\\\\
// Constiables (lol) //////////////////////////////
const decoder = java.util.Base64.getDecoder()
// --------------------------------------------- //
const compressor = net.minecraft.nbt.CompressedStreamTools
// --------------------------------------------- //
const swap = {
    "LEGENDARY":"&6Legendary",
    "EPIC":"&5Epic",
    "RARE":"&9Rare",
    "UNCOMMON":"&aUncommon",
    "COMMON":"&fCommon"
}
///////////////////////////////////////////////////


//\\\\\\\\\\\\\
// Functions //////////////////////////////////////
function decode(bytes) {
    const bytearray = decoder.decode(bytes)
    const inputstream = new java.io.ByteArrayInputStream(bytearray)
    const nbt = compressor.func_74796_a(inputstream)
    return nbt.func_150295_c("i", 10)
}
// --------------------------------------------- //
function rareitySwap(rarity) {
    return swap[rarity]
}
// --------------------------------------------- //
function search(searchFor) {
    searchFor = decode(searchFor)
    const itemIds = new Set(["NECRON_BLADE", "HYPERION", "VALKYRIE", "ASTRAEA", "SCYLLA", "STARRED_DAEDALUS_AXE", "DAEDALUS_AXE", "GRIFFIN", "RAT", "STARRED_MIDAS_STAFF", "MIDAS_STAFF", "DARK_CLAYMORE"])
    for (let i = 0; i < searchFor.func_74745_c(); i++) {
        // Get item data
        let nbt = new NBTTagCompound(searchFor.func_150305_b(i))
        let tag = nbt.getCompoundTag("tag")
        if (tag.hasNoTags()) continue
        let extraAttributes = tag.getCompoundTag("ExtraAttributes")
        let id = extraAttributes.getString("id")
        let display = tag.getCompoundTag("display")
        let name = display.getString("Name")
        if (itemIds.has(id)) {
            if (id == "HYPERION" || id == "NECRON_BLADE" || id == "VALKYRIE" || id == "ASTRAEA" || id == "SCYLLA") {
                hype = true
            } else if (id == "STARRED_DAEDALUS_AXE" || id == "DAEDALUS_AXE") {
                dae = true
            } else if (id == "STARRED_MIDAS_STAFF" || id == "MIDAS_STAFF") {
                midas_spoon = true
            } else if (id == "DARK_CLAYMORE") {
                claymore = true
            }
            let data2 = name
            let lore = display.toObject()["Lore"]
            lore.forEach(line => {
                data2 += `\n${line}`
                if (line.includes("Looting")) {
                    let match = line.match(/Looting (\w+)/)
                    if (match) {looting = decodeNumeral(match[1])}
                } else if (line.includes("Divine Gift")) {
                    let match = line.match(/Divine Gift (\w+)/)
                    if (match) {divineGift = decodeNumeral(match[1])}
                } else if (line.includes("Chimera")) {
                    let match = line.match(/Chimera (\w+)/)
                    if (match) {chimera = decodeNumeral(match[1])}
                }
            })
            new TextComponent(`&8- ${name}`).setHover("show_text", data2).chat()
        }
    }
}
// --------------------------------------------- //
function dianaStats(player) {
    if (!player) {ChatLib.chat(`${prefix} &cPlease input a correct username`); return}    
    new Message(`&aFetching API data for ${player}`).setChatLineId(3747).chat()    
    axios.get(`https://sky.shiiyu.moe/api/v2/profile/${player}`).then(response => {
        ChatLib.clearChat(3747)

        const profiles = response?.data?.profiles
        const selected = Object.keys(profiles).find(key => profiles[key].current)
        const data = profiles[selected]?.raw
        const pets = data?.pets_data?.pets
        const inventory = data?.inventory

        if (response.data.error !== undefined || profiles == undefined || selected == undefined || data == undefined) {
            ChatLib.chat(`Couldn't find any profile with name ${player}`)
            return
        }

        // ancestrialSpade = false // Possibly Use in future for detecting if message should show
        rat = false
        griffin = false
        griffinRare = "N/A"
        dae = false
        hype = false
        claymore = false
        midas_spoon = false
        eman = Number(profiles[selected]?.data?.slayer?.slayers?.enderman?.level?.currentLevel) || 0
        looting = 0
        chimera = 0
        divineGift = 0

        // Myth Mobs
        let minos_champion = data?.player_stats?.kills?.minos_champion || 0
        let minos_inquisitor = data?.player_stats?.kills?.minos_inquisitor || 0
        let minos_inquisitor_750 = data?.player_stats?.kills?.minos_inquisitor_750 || 0
        let minos_hunter = data?.player_stats?.kills?.minos_hunter || 0
        let gaia_construct  = data?.player_stats?.kills?.gaia_construct || 0
        let siamese_lynx  = data?.player_stats?.kills?.siamese_lynx || 0
        let minotaur = data?.player_stats?.kills?.minotaur || 0
        let mythologicalCreatureBestiary = minos_champion+minos_inquisitor+minos_inquisitor_750+minos_hunter+gaia_construct+siamese_lynx+minotaur

// _______________
//  //  //  View Profile
        ChatLib.chat(`\n${prefix} &a${player}'s Diana Stats:`)

// _______________
//  //  //  Weapons
    ChatLib.chat(`&l&3Weapons:`)
    try {
        let inv = inventory?.inv_contents?.data
        let echest = inventory?.ender_chest_contents?.data
        let backpacks = inventory?.backpack_contents
        if (inventory === undefined || backpacks === undefined || echest === undefined) {
            ChatLib.chat(`&l&8- &cInventory API is OFF!`)
        } else {
            const packs = backpacks === undefined ? 0 : Object.keys(backpacks).length
            search(inv)
            search(echest)
            for (let i = 0; i < packs; i++) {
                try {
                    search(backpacks[i.toString()]?.data)
                } catch(e) {console.log(e)}
            }
            if (!hype && !dae && !claymore && !midas_spoon) ChatLib.chat("&8- &cNo Weapons!")
        }
    } catch(e) {ChatLib.chat(e)}

// _______________
//  //  //  Enchants
        ChatLib.chat(`&l&3Enchants:`)
        if (dae) {
            ChatLib.chat("&8- &dChimera " + chimera?? 0)
            ChatLib.chat("&8- &9Looting " + looting)
            ChatLib.chat("&8- &9Divine Gift " + divineGift?? 0)
        } else {
            ChatLib.chat("&8- &cNo Daedalus Axe Found")
        }

// _______________
//  //  //  Pets
        ChatLib.chat(`&l&3Pets:`)
        pets.forEach(pet => {
            if (pet.type == "GRIFFIN") {
                griffin = true
                griffinRare = pet.tier
            } else if (pet.type == "RAT"){
                rat = true
            }

        })
        new TextComponent(`&8- &bGriffin: ${griffin ? "&aYes &8| "+rareitySwap(griffinRare) : "&cNo"} `).chat()
        new TextComponent(`&8- &bRat: ${rat ? "&aYes" : "&cNo"}`).chat()

// _______________
//  //  //  Misc
        ChatLib.chat(`&l&3Misc:`)
        ChatLib.chat(`&8- &bMagical Power: &f` + (data?.accessory_bag_storage?.highest_magical_power ?? "&cNo Magical Power"))
        ChatLib.chat("&8- &bEnderman Slayer: &f" + eman)
        new TextComponent("&8- &bBestiary Kills: &f" + mythologicalCreatureBestiary).setHover("show_text", `&3Breakdown\n&bGaia Construct: &f${gaia_construct || 0}\n&bMinos Champion: &f${minos_champion || 0}\n&bMinos Hunter: &f${minos_hunter || 0}\n&bMinos Inquisitor: &f${minos_inquisitor+minos_inquisitor_750 || 0}\n&bMinotaur: &f${minotaur || 0}\n&bSiamese Lynx: &f${siamese_lynx || 0}`).chat()
    }).catch(e => {
        try {
            ChatLib.chat(`${prefix} &c${e.response.data.error} &8| &4Code: ${e.code}`)
        } catch(e2) {
            ChatLib.chat(`${prefix} &c${e} 3`)
        }
    })
}
///////////////////////////////////////////////////


///////////\\\\\\\\\
// Command: Diana /////////////////////////////////
register('command', (player) => {
    dianaStats(player)
}).setName('ua_command_diana').setAliases("diana")
///////////////////////////////////////////////////


////////\\\\\\\\\
// Chat: Diana ////////////////////////////////////
registerWhen(register('chat', (player) => {
    if (!Settings.autoDianaView) return
    setTimeout(() => {
        dianaStats(stripRank(player))
    }, 300)
}).setCriteria("${player} joined the party."), () => Settings.autoDianaView)
///////////////////////////////////////////////////