/**
 * Strips rank and tags off player name.
 * 
 * @param {String} player - Player name with rank and tags.
 * @returns {String} Base player ign.
 */
export function getPlayerName(player) {
    let name = player;
    let nameIndex = name.indexOf(']');

    while (nameIndex !== -1) {
        name = name.substring(nameIndex + 2);
        nameIndex = name.indexOf(']');
    }

    return name.split(' ')[0];
}

/**
 * Strips the user of the rank.
 *
 * @param {String} player - Player's name with rank ex [MVP++] Da_Minty
 * @returns {String} - Stripped rank ex Da_Minty
 */
export function stripRank(player) {
    let stripped = String(player) // 😏
    stripped = stripped.replace("[MVP++] "," ")
    stripped = stripped.replace("[MVP+] "," ")
    stripped = stripped.replace("[MVP] "," ")
    stripped = stripped.replace("[VIP+] "," ")
    stripped = stripped.replace("[VIP] "," ")
    stripped = stripped.replace(" ","")
    return stripped
}

/**
 * Extracts and returns the guild name from a player's name string.
 *
 * @param {String} player - Player's name, possibly with guild tags and ranks.
 * @returns {String} - Extracted guild name from the player's name.
 */
export function getGuildName(player) {
    let name = player;
    let rankIndex = name.indexOf('] ');
    if (rankIndex !== -1)
        name = name.substring(name.indexOf('] ') + 2);
    name = name.substring(0, name.indexOf('[') - 1);

    return name;
}

/**
 * Returns True if entity is player otherwise False.
 * 
 * @param {Entity} entity - OtherPlayerMP Minecraft Entity.
 * @returns {Boolean} - Whether or not player is human.
 */
export function isPlayer(entity) {
    return World.getPlayerByName(entity.getName())?.getPing() === 1;
}

/**
 * What class you are playing on
 * 
 * @returns {String} - Returns the players class
 */
export function getClass() {
    let tabInfo = TabList.getNames()
    for (let i = 0; i < tabInfo.length; i++) {
        let tabLine = tabInfo[i].removeFormatting()
        if (tabLine.includes(Player.getName())) {
            return tabLine.substring((tabLine.indexOf("(")) + 1)
        }
    }
}

/**
 * What class the playing is playing on
 * 
 * @param {String} player - Player clean username
 * @returns {String} - Returns the players class usage ex getClassOther("Da_Minty")[0] == 'B'
 */
export function getClassOther(player) {
    let tabInfo = TabList.getNames()
    for (let i = 0; i < tabInfo.length; i++) {
        let tabLine = tabInfo[i].removeFormatting()
        if (tabLine.includes(getPlayerName(player))) {
            return tabLine.substring((tabLine.indexOf("(")) + 1)
        }
    }
}