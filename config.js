import { @Vigilant, @TextProperty, @CheckboxProperty, @ButtonProperty, @DecimalSliderProperty @SliderProperty, @SwitchProperty, @SelectorProperty } from 'Vigilance';

export let dragDebuff1array = ["§cDisabled", "UwUaddons » Arrows Detected: {hit}", "UwUaddons » Arrows: {hit}", "UwUaddons » LB's hit: {hit}"]
export let dragDebuff2array = ["§cDisabled", "UwUaddons » Ice Spray: {true/false}", "UwUaddons » Ice Spray: {t/f}", "UwUaddons » Ice Spray: {yes/no}", "UwUaddons » Ice Spray: {y/n}"]
export let dragDebuff3array = ["§cDisabled", "UwUaddons » Twilight: {true/false}", "UwUaddons » Twilight: {t/f}", "UwUaddons » Twilight: {yes/no}", "UwUaddons » Twilight: {y/n}"]
export let dragDebuff4array = ["§cDisabled", "Ice Spray", "Arrows", "Ice Spray & Arrows"]

const version = JSON.parse(FileLib.read("UwUaddons", "metadata.json")).version;
@Vigilant("UwUaddons", `UwUaddons v${version}`, {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "Dungeons", "Sounds", "Carry", "Party Commands", "Mining", "Diana", "Diaz", "Party Finder", "GUI"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class Settings {
//  ////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\  \\
//                             GUI                              \\
//  \\\\\\\\\\\\\\\\\\\\\\\\\\\\||////////////////////////////  \\

    // +--- Define GUI ---+ \\
    GUIpre4Status = new Gui();
    GUIcarryCount = new Gui();

    // +--- Pre 4 ---+ \\
    @SwitchProperty({
        name: "Pre 4 Status",
        description: "Enable this GUI",
        category: "GUI",
        subcategory: "Pre 4",
    })
    GUISpre4Status = false

    @ButtonProperty({
        name: "Pre 4 Status Move",
        description: "Move this GUI",
        category: "GUI",
        subcategory: "Pre 4",
        placeholder: "Move"
    })
    MovePre4() {
        this.GUIpre4Status.open()
    };

    // +--- Carry Count ---+ \\
    @SwitchProperty({
        name: "Carry Count",
        description: "Enable this GUI",
        category: "GUI",
        subcategory: "Carry Count",
    })
    GUIScarryCount = false

    @ButtonProperty({
        name: "Carry Count Move",
        description: "Move this GUI",
        category: "GUI",
        subcategory: "Carry Count",
        placeholder: "Move"
    })
    MoveCarryCount() {
        this.GUIcarryCount.open()
    };

//  ////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\  \\
//                            Sounds                            \\
//  \\\\\\\\\\\\\\\\\\\\\\\\\\\\||////////////////////////////  \\

    // +--- Mute ---+ \\
    @SwitchProperty({
        name: "Mute Walking",
        description: "Mutes walking sounds",
        category: "Sounds",
        subcategory: "Mute",
    })
    muteWalking = false;

    @SwitchProperty({
        name: "Mute Ghast",
        description: "Mutes ghast sounds",
        category: "Sounds",
        subcategory: "Mute",
    })
    muteGhast = false;

    @SwitchProperty({
        name: "Mute Portal",
        description: "Mutes portal sounds",
        category: "Sounds",
        subcategory: "Mute",
    })
    mutePortal = false;

    // +--- Sounds ---+ \\
    @ButtonProperty({
        name: "Minecraft Sound List",
        description: `List of Minecraft Sounds`,
        category: "Sounds",
        subcategory: "General",
        placeholder: "Open"
    })
    ButtonAction() {
        java.awt.Desktop.getDesktop().browse(new java.net.URI(`https://www.minecraftforum.net/forums/mapping-and-modding-java-edition/mapping-and-modding-tutorials/2213619-1-8-all-playsound-sound-arguments`));
    }
    
    @SwitchProperty({
        name: "Custom Etherwarp sound",
        description: "Change Etherwarp sound effect",
        category: "Sounds",
        subcategory: "General",
    })
    etherWarpSound = false;

    @TextProperty({
        name: "➤ Custom Etherwarp sound",
        description: "Mining Speed Boost Alert Sound",
        category: "Sounds",
        subcategory: "General",
        placeholder: "mob.enderdragon.hit"
    })
    cesSound = "mob.enderdragon.hit";

    @DecimalSliderProperty({
        name: "➤ Custom Etherwarp sound Pitch",
        description: "Mining Speed Boost Alert Sound",
        category: "Sounds",
        subcategory: "General",
        minF: 0.5,
        maxF: 2,
        decimalPlaces: 1,
    })
    cesSoundPitch = 0.5;

    @SwitchProperty({
        name: "Mining Speed Boost Alert",
        description: "Do something when your Speed boost is available",
        category: "Sounds",
        subcategory: "General",
    })
    msbAlert = false;

    @SwitchProperty({
        name: "➤ MSB Dwarven/Hollows Only",
        description: "Alert only when in Crystal Hollows or Dwarven Mines",
        category: "Sounds",
        subcategory: "General",
    })
    msbAreaDH = false;

    @TextProperty({
        name: "➤ MSB Sound",
        description: "Mining Speed Boost Alert Sound",
        category: "Sounds",
        subcategory: "General",
        placeholder: "note.pling"
    })
    msbSound = "note.pling";

    @DecimalSliderProperty({
        name: "➤ MSB Sound Pitch",
        description: "Mining Speed Boost Alert Sound",
        category: "Sounds",
        subcategory: "General",
        minF: 0.5,
        maxF: 2,
        decimalPlaces: 1,
    })
    msbSoundPitch = 1.0;

    // +--- UwUify ---+ \\
    @SwitchProperty({
        name: "UwUify",
        description: ":3",
        category: "Sounds",
        subcategory: "UwUify",
    })
    uwuify = false;

    @SwitchProperty({
        name: "➤ Terminals",
        description: "UwU when you complete a terminal",
        category: "Sounds",
        subcategory: "UwUify",
    })
    uwuTerminals = false;

    @SwitchProperty({
        name: "➤ Device",
        description: "UwU when you complete a device",
        category: "Sounds",
        subcategory: "UwUify",
    })
    uwuDevice = false;

    @SwitchProperty({
        name: "➤ Death",
        description: "UwU when you die",
        category: "Sounds",
        subcategory: "UwUify",
    })
    uwuDeath = false;

    @SwitchProperty({
        name: "➤ Message",
        description: "UwU when someone says \"UWU\"",
        category: "Sounds",
        subcategory: "UwUify",
    })
    uwuMessage = false;

    @SwitchProperty({
        name: "➤ Inquisitor",
        description: "UwU when you dig up a Minos Inquisitor",
        category: "Sounds",
        subcategory: "UwUify",
    })
    uwuInq = false;

    @SwitchProperty({
        name: "➤ Rare Sea Creature",
        description: "UwU when you fish up a Rare Sea Creature",
        category: "Sounds",
        subcategory: "UwUify",
    })
    uwuSC = false;


//  ////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\  \\
//                           General                            \\
//  \\\\\\\\\\\\\\\\\\\\\\\\\\\\||////////////////////////////  \\
    @ButtonProperty({
        name: "Discord",
        description: `Discord server please join :) uwu`,
        category: "General",
        subcategory: "Discord",
        placeholder: "Join"
    })
    discordButtonAction() {
        java.awt.Desktop.getDesktop().browse(new java.net.URI(`https://discord.gg/WNkXDY8svb`));
    }

    // +--- Other ---+ \\
    @SwitchProperty({
        name: "Auto /chat p",
        description: "Auto /chat p when join party",
        category: "General",
        subcategory: "Other",
    })
    chatp = false;

    @SwitchProperty({
        name: "Hide Soopy Ping",
        description: "Hides: Unknown command. Type \"/help\" for help. ('uhfdsolguhkjdjfhgkjhdfdlgkjhldkjhlkjhsldkjfhldshkjf')",
        category: "General",
        subcategory: "Other",
    })
    soopyPing = true;

    @SwitchProperty({
        name: "Spring Boots Overlay",
        description: "Display a timer for spring boots",
        category: "General",
        subcategory: "Other",
    })
    springBoot = false;

    @SwitchProperty({
        name: "Ragnarock Axe Strength Timer",
        description: "Displays how long you have left until ragnarock axe strength runs out",
        category: "General",
        subcategory: "Other",
    })
    ragAxeTimer = false;

    @SwitchProperty({
        name: "Ragnarock Axe Alert",
        description: "Alerts you when you need to rag axe in M7 P5",
        category: "General",
        subcategory: "Other",
    })
    ragAxeAlert = false;

    @SwitchProperty({
        name: "Bat Death Notification",
        description: "Send a chat message/title when a secret bat died, this is good if you're listening to music or annoying nons and you cant hear the game properly!",
        category: "General",
        subcategory: "Other",
    })
    secretBat0 = false;

    @CheckboxProperty({
        name: "➤ Bat Death Chat Message",
        description: "",
        category: "General",
        subcategory: "Other",
    })
    secretBat1 = false;

    @CheckboxProperty({
        name: "➤ Bat Death Title",
        description: "",
        category: "General",
        subcategory: "Other",
    })
    secretBat2 = false;

    @SwitchProperty({
        name: "Rogue Sword Alert",
        description: "Alert when rogue sword has run out",
        category: "General",
        subcategory: "Other",
    })
    rogueSword = false;

    @DecimalSliderProperty({
        name: "➤ Rogue Sword Timer",
        description: "How long before rogue sword is ready (def 25s)",
        category: "General",
        subcategory: "Other",
        minF: 5.0,
        maxF: 30.0,
        decimalPlaces: 1
    })
    rogueSwordTimer = 25.0;


    // +--- Greetings ---+ \\
    @SwitchProperty({
        name: "Greet Friends And Guild",
        description: "Message Friends And Guildmates when they join hypixel!",
        category: "General",
        subcategory: "Greetings",
    })
    greetFriendandGuild = false;

    @SwitchProperty({
        name: "➤ Hide Greeting Message",
        description: "",
        category: "General",
        subcategory: "Greetings",
    })
    greetHide = false;

    @CheckboxProperty({
        name: "➤ Greet Friends",
        description: "",
        category: "General",
        subcategory: "Greetings",
    })
    greetFriends = false;

    @CheckboxProperty({
        name: "➤ Greet Guild",
        description: "",
        category: "General",
        subcategory: "Greetings",
    })
    greetGuild = false;

    @SelectorProperty({
        name: "➤ Guild Greet Type",
        description: "",
        category: "General",
        subcategory: "Greetings",
        options: ["Personal Message", "Guild Chat"]
    })
    greetGuildType = 0;

    // +--- Emojis ---+ \\
    @SwitchProperty({
        name: "Chat Emoji",
        description: "Ex: Convert 'o/' to &d( ﾟ◡ﾟ)/",
        category: "General",
        subcategory: "Emojis",
    })
    chatEmoji = false;

    @CheckboxProperty({
        name: "➤ Emoji Convert [MVP&6++&r] (++)",
        description: "",
        category: "General",
        subcategory: "Emojis",
    })
    emojiMVP = false;

    @CheckboxProperty({
        name: "➤ Emoji Convert [MVP&1++&r] (Gift)",
        description: "",
        category: "General",
        subcategory: "Emojis",
    })
    emojiGift = false;

    @CheckboxProperty({
        name: "➤ Emoji Convert Custom",
        description: "/ua emoji help",
        category: "General",
        subcategory: "Emojis",
    })
    emojiCustom = false;


//  ////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\  \\
//                           Dungeons                           \\
//  \\\\\\\\\\\\\\\\\\\\\\\\\\\\||////////////////////////////  \\

    // +--- Device ---+ \\
    @SwitchProperty({
        name: "Notify Pre 4",
        description: "Notifies you when pre 4 has been completed\n&eWorks best only for M7 as it goes off the classes, healer & berserk",
        category: "Dungeons",
        subcategory: "Device"
    })
    notifyi4 = false;

    @SwitchProperty({
        name: "➤ Notify Party Pre 4",
        description: "Notifies the party when pre 4 has been completed",
        category: "Dungeons",
        subcategory: "Device"
    })
    notifypartyi4 = false;

    @CheckboxProperty({
        name: "➤ Notify Pre 4: Completed",
        description: "",
        category: "Dungeons",
        subcategory: "Device",
    })
    pre4comp = false;

    @CheckboxProperty({
        name: "➤ Notify Pre 4: Incomplete",
        description: "",
        category: "Dungeons",
        subcategory: "Device",
    })
    pre4incomp = false;

    @CheckboxProperty({
        name: "➤ Notify Pre 4: Completed (R)",
        description: "Same thing, but reminds you at Section 4 of Goldor!",
        category: "Dungeons",
        subcategory: "Device",
    })
    pre4compRem = false;

    @CheckboxProperty({
        name: "➤ Notify Pre 4: Incomplete (R)",
        description: "Same thing, but reminds you at Section 4 of Goldor!",
        category: "Dungeons",
        subcategory: "Device",
    })
    pre4incompRem = false;

    
    @SwitchProperty({
        name: "Device Completed",
        description: "Notifies you when any device has been complete",
        category: "Dungeons",
        subcategory: "Device"
    })
    devicecomplete = false;

    @SwitchProperty({
        name: "Simon Says Time",
        description: "How long Simon Says took\n&eWorks best only for M7 as it goes off the classes, healer & berserk",
        category: "Dungeons",
        subcategory: "Device"
    })
    simonsaystime = false;

    @SwitchProperty({
        name: "➤ Notify Party Simon Says Time",
        description: "Notify your party of how long Simon Says took",
        category: "Dungeons",
        subcategory: "Device"
    })
    notifyPartySimonSays = false;

    // +--- Tank ---+ \\
    @SwitchProperty({
        name: "Notify Nuke",
        description: "Falsely set off when you die to lightning in F7",
        category: "Dungeons",
        subcategory: "Tank"
    })
    notifyNuke = false;

    @TextProperty({
        name: "➤ Title Notification",
        description: "Displays when you die to a player nuke",
        category: "Dungeons",
        subcategory: "Tank",
        placeholder: ""
    })
    nukeText = "NUKED!";

    @SwitchProperty({
        name: "➤ Notify Party of Nuke",
        description: "(Falsely set off when you die to lightning in F7)",
        category: "Dungeons",
        subcategory: "Tank"
    })
    notifyPartyNuke = false;

    @TextProperty({
        name: "➤ Party Chat Notification",
        description: "Displays when you die to a player nuke",
        category: "Dungeons",
        subcategory: "Tank",
        placeholder: ""
    })
    notifyPartyNukeText = "UwUaddons » Nuked!";

    @SwitchProperty({
        name: "Ultimate",
        description: "Notifies the player when to ultimate",
        category: "Dungeons",
        subcategory: "Tank",
    })
    notifyUltimate = false;

    @TextProperty({
        name: "➤ Ultimate Text",
        description: "Custom ultimate text",
        category: "Dungeons",
        subcategory: "Tank",
        placeholder: ""
    })
    notifyUltimatetext = "&6ULTIMATE";

    @SwitchProperty({
        name: "Used Ultimate",
        description: "Notifies the player when used ultimate",
        category: "Dungeons",
        subcategory: "Tank",
    })
    notifyusedUltimate = false;

    @TextProperty({
        name: "➤ Used Ultimate Text",
        description: "Custom ultimate used text",
        category: "Dungeons",
        subcategory: "Tank",
        placeholder: ""
    })
    notifyusedUltimatetext = "&aUSED";

    @SwitchProperty({
        name: "Storm Enraged",
        description: "Notify Tank when to pad",
        category: "Dungeons",
        subcategory: "Tank"
    })
    stormEnrage = false;

    @SwitchProperty({
        name: "➤ Only Show When Tank",
        description: "Only Notify Storm Enraged when tank",
        category: "Dungeons",
        subcategory: "Tank"
    })
    stormEnrageTank = false;

    @TextProperty({
        name: "➤ Storm Enraged Text",
        description: "Custom ultimate text",
        category: "Dungeons",
        subcategory: "Tank",
        placeholder: ""
    })
    stormEnrageText = "&6Pad!";

    // +--- Healer ---+ \\
    @SwitchProperty({
        name: "Wish",
        description: "Notifies the player when to wish",
        category: "Dungeons",
        subcategory: "Healer",
    })
    wishNotify = false;

    @TextProperty({
        name: "➤ Wish Text",
        description: "Custom Wish Text",
        category: "Dungeons",
        subcategory: "Healer",
        placeholder: ""
    })
    wishNotifyText = "&6WISH";

    @SwitchProperty({
        name: "Wished",
        description: "Notifies the player when you have wished",
        category: "Dungeons",
        subcategory: "Healer",
    })
    wishedNotify = false;

    @TextProperty({
        name: "➤ Wished Text",
        description: "Custom Wished Text",
        category: "Dungeons",
        subcategory: "Healer",
        placeholder: ""
    })
    wishedNotifyText = "&aWISHED";

    // +--- General ---+ \\
    @SwitchProperty({
        name: "Hide Boss Messages",
        description: "Hides, Ex: [BOSS] Necron: I will eat you",
        category: "Dungeons",
        subcategory: "General",
    })
    hideBossMSG = false;

    @SwitchProperty({
        name: "Notify &nParty&r of debuff",
        description: "Tells your party how much you debuffed a dragon in M7\n&cCredit: AzuredClient",
        category: "Dungeons",
        subcategory: "Dragon Debuff",
    })
    dragDebuff0 = false;

    @CheckboxProperty({
        name: "➤ Debuff: Split Only",
        description: "Only sends the message on the first dragon",
        category: "Dungeons",
        subcategory: "Dragon Debuff",
    })
    dragDebuff5 = false;

    @SelectorProperty({
        name: "➤ Debuff: Arrow Message Style",
        description: "&eThis will add onto your final message",
        category: "Dungeons",
        subcategory: "Dragon Debuff",
        options: dragDebuff1array
    })
    dragDebuff1 = 1;

    @SelectorProperty({
        name: "➤ Debuff: Ice Spray Message Style",
        description: "&eThis will add onto your final message",
        category: "Dungeons",
        subcategory: "Dragon Debuff",
        options: dragDebuff2array
    })
    dragDebuff2 = 1;

    @SelectorProperty({
        name: "➤ Debuff: Twilight Message Style",
        description: "&eThis will add onto your final message",
        category: "Dungeons",
        subcategory: "Dragon Debuff",
        options: dragDebuff3array
    })
    dragDebuff3 = 0;

    @SelectorProperty({
        name: "➤ Debuff: ms Message Style",
        description: "&c&lWIP&r When your first ice spray/last breath was hit.\nEx: UwUaddons » Ice Spray hit in 52ms \n&eThis will add onto your final message",
        category: "Dungeons",
        subcategory: "Dragon Debuff",
        options: dragDebuff4array
    })
    dragDebuff4 = 0;

    @SwitchProperty({
        name: "Wither Stuck",
        description: "Wither Stuck Title",
        category: "Dungeons",
        subcategory: "General",
    })
    witherstuckNotify = false;

    @SelectorProperty({
        name: "➤ Wither Stuck Colour",
        description: "What colour the \"Stuck\" is",
        category: "Dungeons",
        subcategory: "General",
        options: ["§0Black", "§1Dark Blue", "§2Dark Green", "§3Cyan", "§4Dark Red", "§5Dark Purple", "§6Gold", "§7Light Gray", "§8Dark Gray", "§9Blue", "§aLight Green", "§bLight Blue", "§cRed", "§dLight Pink", "§eYellow"]
    })
    stuckColour = 6;

    @SwitchProperty({
        name: "Downtime Command",
        description: "!dt {reason}",
        category: "Dungeons",
        subcategory: "General",
    })
    dtCommand = false;

    @SwitchProperty({
        name: "Auto Go",
        description: "Automatically requeue into a new run",
        category: "Dungeons",
        subcategory: "General",
    })
    dtCommandAutoGo = false;

    @DecimalSliderProperty({
        name: "➤ Auto Go Timer",
        description: "How long after the run is completed (seconds, default 5 seconds)",
        category: "Dungeons",
        subcategory: "General",
        minF: 3.0,
        maxF: 10.0,
        decimalPlaces: 1
    })
    dtCommmandAutoGoTime = 5.0;

    @SwitchProperty({
        name: "Tac Insertion Timer",
        description: "Display a timer for tactical insertion",
        category: "Dungeons",
        subcategory: "General",
    })
    tacIns = false;

    @SwitchProperty({
        name: "Blood Ready",
        description: "Alert when Blood Mobs have spawned",
        category: "Dungeons",
        subcategory: "General",
    })
    bloodReady = false;

    @SwitchProperty({
        name: "➤ Blood Ready Party Alert",
        description: "Alerts the Party when Blood Mobs have spawned",
        category: "Dungeons",
        subcategory: "General",
    })
    bloodReadyParty = false;

    @SwitchProperty({
        name: "Blood Done",
        description: "Alert when Blood Mobs have been killed",
        category: "Dungeons",
        subcategory: "General",
    })
    bloodDone = false;

    @SwitchProperty({
        name: "➤ Blood Done Party Alert",
        description: "Alerts the Party when Blood Mobs have been killed",
        category: "Dungeons",
        subcategory: "General",
    })
    bloodDoneParty = false;

    @SwitchProperty({
        name: "Hide Milestones",
        description: "Hides the annoying milestone messages",
        category: "Dungeons",
        subcategory: "General",
    })
    hideMilestone = false;


//  ////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\  \\
//                            Carry                             \\
//  \\\\\\\\\\\\\\\\\\\\\\\\\\\\||////////////////////////////  \\

    // +--- Dungeons ---+ \\
    @SwitchProperty({
        name: "Carry Mode",
        description: "Carry Mode | /ua setcarry {ammout} | /ua carrymode",
        category: "Carry",
        subcategory: "Dungeons",
    })
    carryMode = false;

    @SelectorProperty({
        name: "➤ Carry Type",
        description: "Built in config for carry",
        category: "Carry",
        subcategory: "Dungeons",
        options: ["None", "M7", "M6", "M5"]
    })
    carryModeType = 0;


//  ////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\  \\
//                            Mining                            \\
//  \\\\\\\\\\\\\\\\\\\\\\\\\\\\||////////////////////////////  \\

    // +--- Crystal Hollows ---+ \\
    @SwitchProperty({
        name: "Robot Part Click",
        description: "Click on Professor Robot's message to open the bazzar/sacks to the respective part",
        category: "Mining",
        subcategory: "Crystal Hollows",
    })
    robotPart = false;


//  ////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\  \\
//                            Diana                             \\
//  \\\\\\\\\\\\\\\\\\\\\\\\\\\\||////////////////////////////  \\

    // +--- Inquisitor ---+ \\
    @SwitchProperty({
        name: "Inquisitor",
        description: "Notify Party when you get inquisitor",
        category: "Diana",
        subcategory: "Inquisitor",
    })
    dianaInq = false;

    @TextProperty({
        name: "➤ Inquisitor Text",
        description: "Party Text",
        category: "Diana",
        subcategory: "Inquisitor",
        placeholder: ""
    })
    dianaInqText = "UwUaddons » Inquisitor Spawned!";

    // +--- Diana Profile View ---+ \\
    @SwitchProperty({
        name: "Auto /ua diana",
        description: "Runs /ua diana on a player joining the party",
        category: "Diana",
        subcategory: "Diana Profile View",
    })
    autoDianaView = false;

    // +--- Treasure ---+ \\
    @SwitchProperty({
        name: "Diana Treasure",
        description: "Notifies you if you get coinage",
        category: "Diana",
        subcategory: "Treasure",
    })
    dianaTreasure = false;

    @CheckboxProperty({
        name: "➤ Diana Treasure Notify Party",
        description: "Notfies party if you get a HIGH coin ammount",
        category: "Diana",
        subcategory: "Treasure",
    })
    dianaTreasureParty = false;

    @CheckboxProperty({
        name: "➤ 750K",
        description: "",
        category: "Diana",
        subcategory: "Treasure",
    })
    dianaTreasureParty750k = true;

    @CheckboxProperty({
        name: "➤ 500K",
        description: "",
        category: "Diana",
        subcategory: "Treasure",
    })
    dianaTreasureParty500k = false;

    @CheckboxProperty({
        name: "➤ 250K",
        description: "",
        category: "Diana",
        subcategory: "Treasure",
    })
    dianaTreasureParty250k = false;

    @CheckboxProperty({
        name: "➤ 100K",
        description: "",
        category: "Diana",
        subcategory: "Treasure",
    })
    dianaTreasureParty100k = false;

    @CheckboxProperty({
        name: "➤ 50K",
        description: "",
        category: "Diana",
        subcategory: "Treasure",
    })
    dianaTreasureParty50k = false;

//  ////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\  \\
//                         Party  Commands                      \\
//  \\\\\\\\\\\\\\\\\\\\\\\\\\\\||////////////////////////////  \\

    // +--- Commands ---+ \\
    @TextProperty({
        name: "Prefix",
        description: "Enter Prefix for the party to use",
        category: "Party Commands",
        subcategory: "Config"
    })
    prefixPC = "!";

    @CheckboxProperty({
        name: "!aura",
        description: "Toggles the feature",
        category: "Party Commands",
        subcategory: "Commands"
    })
    aura = true;


//  ////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\  \\
//                             Diaz                             \\
//  \\\\\\\\\\\\\\\\\\\\\\\\\\\\||////////////////////////////  \\

    // +--- General ---+ \\
    @SwitchProperty({
        name: "Stock of Stonk Prices",
        description: "Show stock of stonk price in stonk auction when Mayor Diaz is elected",
        category: "Diaz",
        subcategory: "General",
    })
    stockPrices = false;


//  ////////////////////////////||\\\\\\\\\\\\\\\\\\\\\\\\\\\\  \\
//                            Hidden                            \\
//  \\\\\\\\\\\\\\\\\\\\\\\\\\\\||////////////////////////////  \\
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("General", "&aMod Created by &l@da_minty")
        this.setSubcategoryDescription("General", "Greetings", "/ua help for more information on greeting command")
        this.addDependency("➤ Notify Party Pre 4", "Notify Pre 4")
        this.addDependency("➤ Notify Pre 4: Incomplete", "Notify Pre 4")
        this.addDependency("➤ Notify Pre 4: Completed", "Notify Pre 4")
        this.addDependency("➤ Notify Pre 4: Incomplete (R)", "Notify Pre 4")
        this.addDependency("➤ Notify Pre 4: Completed (R)", "Notify Pre 4")
        this.addDependency("➤ Title Notification", "Notify Nuke")
        this.addDependency("➤ Notify Party of Nuke", "Notify Nuke")
        this.addDependency("➤ Party Chat Notification", "Notify Nuke", "Notify Party of Nuke")
        this.addDependency("➤ Wither Stuck Colour", "Wither Stuck")
        this.addDependency("➤ Wish Text", "Wish")
        this.addDependency("➤ Wished Text", "Wished")
        this.addDependency("➤ Ultimate Text", "Ultimate")
        this.addDependency("➤ Used Ultimate Text", "Used Ultimate")
        this.addDependency("➤ Notify Party Simon Says Time", "Simon Says Time")
        this.addDependency("➤ Terminals", "UwUify")
        this.addDependency("➤ Device", "UwUify")
        this.addDependency("➤ Death", "UwUify")
        this.addDependency("➤ Message", "UwUify")
        this.addDependency("➤ Inquisitor", "UwUify")
        this.addDependency("➤ Rare Sea Creature", "UwUify")
        this.addDependency("➤ Carry Type", "Carry Mode")
        this.addDependency("➤ Only Show When Tank", "Storm Enraged")
        this.addDependency("➤ Storm Enraged Text", "Storm Enraged")
        this.addDependency("➤ Rogue Sword Timer", "Rogue Sword Alert")
        this.addDependency("➤ Diana Treasure Notify Party", "Diana Treasure")
        this.addDependency("➤ 50K", "Diana Treasure")
        this.addDependency("➤ 100K", "Diana Treasure")
        this.addDependency("➤ 250K", "Diana Treasure")
        this.addDependency("➤ 500K", "Diana Treasure")
        this.addDependency("➤ 750K", "Diana Treasure")
        this.addDependency("➤ Inquisitor Text", "Inquisitor")
        this.addDependency("➤ Auto Go Timer", "Auto Go")
        this.addDependency("➤ Blood Ready Party Alert", "Blood Ready")
        this.addDependency("➤ Blood Done Party Alert", "Blood Done")
        this.addDependency("➤ Greet Friends", "Greet Friends And Guild")
        this.addDependency("➤ Greet Guild", "Greet Friends And Guild")
        this.addDependency("➤ Hide Greeting Message", "Greet Friends And Guild")
        this.addDependency("➤ Guild Greet Type", "Greet Friends And Guild")
        this.addDependency("➤ Emoji Convert [MVP&6++&r] (++)", "Chat Emoji")
        this.addDependency("➤ Emoji Convert [MVP&1++&r] (Gift)", "Chat Emoji")
        this.addDependency("➤ Emoji Convert Custom", "Chat Emoji")
        this.addDependency("➤ MSB Sound Pitch", "Mining Speed Boost Alert")
        this.addDependency("➤ MSB Sound", "Mining Speed Boost Alert")
        this.addDependency("➤ MSB Dwarven/Hollows Only", "Mining Speed Boost Alert")
        this.addDependency("➤ Custom Etherwarp sound", "Custom Etherwarp sound")
        this.addDependency("➤ Custom Etherwarp sound Pitch", "Custom Etherwarp sound")
        this.addDependency("➤ Bat Death Chat Message", "Bat Death Notification")
        this.addDependency("➤ Bat Death Title", "Bat Death Notification")
        this.addDependency("➤ Debuff: Split Only", "Notify &nParty&r of debuff")
        this.addDependency("➤ Debuff: Arrow Message Style", "Notify &nParty&r of debuff")
        this.addDependency("➤ Debuff: Ice Spray Message Style", "Notify &nParty&r of debuff")
        this.addDependency("➤ Debuff: Twilight Message Style", "Notify &nParty&r of debuff")
        this.addDependency("➤ Debuff: ms Message Style", "Notify &nParty&r of debuff")
    }
}
export default new Settings();