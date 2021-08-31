const { MessageEmbed } = require("discord.js");
const ayar = require('../ayar.json');
const kayıtlar = require('quick.db');

exports.run = async(client, message, args) => {

if(!message.member.roles.cache.has(ayar.registerHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.carpi)

    let data = await kayıtlar.get(`teyit`) || {};

    let xd = Object.keys(data);
    let topteyit = xd.filter(dat => message.guild.members.cache.has(dat)).sort((a, b) => Number((data[b].e || 0) + (data[b].k || 0)) - Number((data[a].e || 0) + (data[a].k || 0))).map((value, index) => `\`${index + 1}.\` ${message.guild.members.cache.get(value)} Toplam **${((data[value].e || 0) + (data[value].k || 0))}** (**${((data[value].e || 0))}** Erkek **${((data[value].k || 0))}** Kadın)`).splice(0, 15);
    
    message.channel.send(new MessageEmbed()
    .setDescription(`
    Sunucuda en çok kayıt yapanların listesi;
    ────────────────────────
    ${topteyit.join("\n") || "Teyit veritabanı bulunamadı!"}
    `)).catch().then(m => m.delete({ timeout: 15000 }))

}
exports.configuration = {
    aliases: ['top-teyit'],
    name:'topteyit'
}
