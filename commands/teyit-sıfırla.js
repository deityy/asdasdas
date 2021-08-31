const { MessageEmbed } = require("discord.js");
const ayar = require('../ayar.json');
const kayıtlar = require('quick.db');

exports.run = async(client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.carpi)

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return message.react(ayarlar.carpi)

    if(member) {
        kayıtlar.delete(`teyit.${member.id}.t`)
        kayıtlar.delete(`teyit.${member.id}.e`)
        kayıtlar.delete(`teyit.${member.id}.k`)
        message.channel.send(new MessageEmbed()
        .setDescription(`${member} Üyesinin Kayıt Verileri Sıfırlandı`))
        .catch((err) => console.log((err)))
        .then(mesajı => mesajı.delete({ timeout: 15000 }))
    }
}
exports.configuration = {
    aliases: ['teyitsıfırla'],
    name:'teyit-sıfırla'
}