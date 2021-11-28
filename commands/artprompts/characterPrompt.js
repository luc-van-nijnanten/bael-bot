const commando = require("@iceprod/discord.js-commando");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const {promptFetcher} = require('./artpromptsController');


module.exports = class characterPrompt extends commando.Command {
    constructor(client) {
        super(client, {
            name: "characterprompt",
            memberName: "characterprompt",
            group: "artprompts",
            description: "description",
            throttle: {
                uses: 1,
                time: 20
            }
        });
    }
    async run(msg, { args }) {
        let embed = new MessageEmbed;
        var arrAttb = await promptFetcher('/appearance.php')
        var trimmedArrAtrb = [];
        arrAttb.forEach(function (atr, i) {
            if (atr.trim() == '' || atr == null || i == 0 || i == arrAttb.length - 1) {
                return;
            }
            return trimmedArrAtrb.push(atr.trim())
        })

        //create the description string
        var detailarr = []
        trimmedArrAtrb.forEach(function (atr, i){
            if (i == 0) return;
            if (atr == "(Optional)") {
                return detailarr.push({name: atr,value: '\u200B', inline: false})
            }
            let satr = atr.replace(':',':#').split('#');
            detailarr.push({name: satr[0], value: satr[1], inline: true});
        })
        embed
            .addFields(detailarr)
            .setTitle(trimmedArrAtrb[0])

        msg.say(embed)
    }
};