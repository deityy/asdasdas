const { MessageEmbed } = require('discord.js');
const ayar = require('../ayar.json');

exports.run = async(client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Yetkin yok.`).then(x => x.delete({timeout:3000}))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member && !message.guild.member(member)) return message.reply(new MessageEmbed().setDescription(`Geçerli bir üye etiketle.`)).then(w => w.delete({ timeout:3000 }))

member.roles.add("857983336784855102")
message.channel.send(new MessageEmbed()
.setAuthor(message.author.username, message.author.avatarURL({ dynamic:true }))
.setTimestamp().setFooter("Orchais ❤️ Guevara").setThumbnail(message.guild.iconURL({dynamic:true}))
.setDescription(`${member} üyesine ${message.author} tarafından ${message.guild.roles.cache.get("857983336784855102")} rolü verildi.`)).then(x => x.delete({ timeout:5500 }))
};

exports.configuration = {
    name:'vip',
    aliases:[]
}