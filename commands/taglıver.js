const { MessageEmbed } = require('discord.js');
const ayar = require('../ayar.json');

exports.run = async(client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Yetkin yok.`).then(x => x.delete({timeout:3000}))

let sizd = message.guild.members.cache.filter(a => a.user.username.includes('Guevara') && a.user.discriminator.includes("1947") && !a.roles.cache.has("857983334897680436"));

let mapping = sizd.map(x => x)

message.guild.members.cache.filter(a => a.user.username.includes('Guevara') && a.user.discriminator.includes("1947")).forEach(async (member) => {
    await member.roles.add(ayar.teamRole)
    }) 
message.channel.send( 
         new MessageEmbed()
         .setAuthor(message.author.username, message.author.avatarURL({ dynamic:true }))
         .setTimestamp().setFooter("Orchais ❤️ Guevara").setThumbnail(message.guild.iconURL({dynamic:true}))
         .setDescription(`${sizd.size} üyeye ${message.guild.roles.cache.get(ayar.teamRole)} rolü verildi.\n\n${mapping.join(", ")}`)).then(x => x.delete({ timeout:5500 }))

};

exports.configuration = {
    name:'taglıver',
    aliases:[]
}