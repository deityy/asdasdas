const { MessageEmbed } = require('discord.js');
const ayar = require('../ayar.json');

exports.run = async(client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Yetkin yok.`).then(x => x.delete({timeout:3000}))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member && !message.guild.member(member)) return message.reply(new MessageEmbed().setDescription(`Geçerli bir üye etiketle.`)).then(w = w.delete({ timeout:3000 }))

let isim = args[1];
let yaş = Number(args[2]);
if(!isim || !yaş || isNaN(yaş)) return message.reply(new MessageEmbed().setDescription(`İsim ve yaşı doğru gir.`)).then(w = w.delete({ timeout:3000 }))

let cins = args[3];
if(!args[3]) return message.reply(new MessageEmbed().setDescription(`Geçerli bir cinsiyet gir. \`e\` , \`k\``)).then(w = w.delete({ timeout:3000 }))

if(args[3] === "e") { 
message.react(ayar.tik)
    member.roles.add(ayar.manRoles)
    member.roles.add("857983336784855102")
    member.roles.remove(ayar.unregisteredRole)
    member.setNickname(`• ${isim} ' ${yaş}`)

}

if(args[3] === "k") { 
    message.react(ayar.tik)
        member.roles.add(ayar.womanRoles)
        member.roles.add("857983336784855102")
        member.roles.remove(ayar.unregisteredRole)
        member.setNickname(`• ${isim} ' ${yaş}`)
    
    }

};

exports.configuration = {
    name:'special',
    aliases:[]
}