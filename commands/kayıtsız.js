const { MessageEmbed } = require("discord.js");
const conf = require('../ayar.json');
const kayıtlar = require('quick.db');

exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(conf.registerHammer) && !message.member.hasPermission(8)) return message.react(conf.carpi)

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if (!uye) return message.react(conf.carpi)

    if (uye.id === client.user.id) return message.react(conf.carpi)
    if (uye.id === message.author.id) return message.react(conf.carpi)

    message.channel.send(new MessageEmbed() .setDescription(`${uye} Adlı Kullanıcı ${message.author} Tarafından Başarıyla Kayıtsıza Atıldı.`)).then(x => x.delete({ timeout: 7000 }))

    await uye.roles.set([conf.unregisteredRole])
    await uye.setNickname(`• İsim ' Yaş`)
    kayıtlar.push(`registerData.${uye.id}`, {
        Nickname: "Kayıtsıza atma",
        Staff: message.author.id,
        Date: Date.now()
    })
}
exports.configuration = {
    aliases: ['unreg','unregistered'],
    name:'kayıtsız'
}