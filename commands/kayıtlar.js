const { MessageEmbed } = require('discord.js');
const ayar = require('../ayar.json');
const kayıtlar = require('quick.db');

exports.run = async(client, message, args) => {

let kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if(!kullanıcı) return message.react(ayar.carpi)

let data = await kayıtlar.get(`registerData.${kullanıcı.id}`)

if(!data) return message.reply(`Kullanıcı daha önceden kayıt olmamış.`).then(x => x.delete({ timeout:5000 }))
let isimler = data.map((value, index) => `\`${index+1}.\` (\`${value.Nickname}\`) <@${value.Staff}> tarafından,`)

message.channel.send(new MessageEmbed().setFooter(`${message.author.tag} tarafından istendi.`) .setTimestamp() 
.setDescription(`<@${kullanıcı.id}> üyesinin kayıt bilgileri;
────────────────────────
${isimler.join("\n") || "*Ne yazık ki kullanıcı daha önceden kayıt olmamış..*"}`))

};

exports.configuration = {
    name:'kayıtlar',
    aliases:["isimler"]
}