const { MessageEmbed } = require("discord.js");
const ayar = require('../ayar.json');
const kayıtlar = require('quick.db')
exports.run = async(client, message, args) => {

if(!message.member.roles.cache.has(ayar.registerHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.carpi)

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author;


        let man = await kayıtlar.fetch(`teyit.${member.id}.e`)
        let total = await kayıtlar.fetch(`teyit.${member.id}.t`)
        let woman = await kayıtlar.fetch(`teyit.${member.id}.k`)
        if(total === null) total = "0"
        if(total === undefined) total = "0"
        if(man === null) man = "0"
        if(man === undefined) man = "0"
        if(woman === null) woman = "0"
        if(woman === undefined) woman = "0"


        message.channel.send(new MessageEmbed() .setDescription(`
        ${member}, Kullanıcısının teyit bilgileri;

        \`•\` Toplam kayıtların: \`${total}\`
        \`•\` Erkek kayıtların: \`${man}\`
        \`•\` Kadın kayıtların: \`${woman}\`

        \`.teyitbilgi @Orchais/ID\` yazarak başkasının teyit bilgilerine bakabilirsin.
        `)
        .setThumbnail(message.author.displayAvatarURL({ dynamic:true }))
        ).catch().then(mesajı => mesajı.delete({ timeout: 20000 }))

}
exports.configuration = {
    aliases: ['teyit-bilgi'],
    name:'teyitbilgi'
}