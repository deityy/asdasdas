const { MessageEmbed } = require('discord.js');
let ayar = require('../ayar.json');

exports.run = async(client, message, args) => { 

let total = message.guild.memberCount;
let aktif = message.guild.members.cache.filter(x => x.presence.status !== "offline").size;
let kayıtlı = message.guild.members.cache.filter(x => !x.roles.cache.has(ayar.unregisteredRole)).size;
let erkek = message.guild.members.cache.filter(a => a.roles.cache.has("857983341226885140")).size;
let kız = message.guild.members.cache.filter(b => b.roles.cache.has("857983338480271360")).size;
let nametaglı = message.guild.members.cache.filter(x => x.user.username.includes(ayar.tag)).size;
let discrimtaglı = message.guild.members.cache.filter(x => x.user.discriminator.includes("1947")).size;
let ses = message.guild.members.cache.filter(l => l.voice.channel).size;

message.channel.send(
    new MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic:true }))
    .setTimestamp().setFooter("Orchais ❤️ Guevara").setThumbnail(message.guild.iconURL({ dynamic:true }))
    .setDescription(`
    Sunucumuzda;
\`~\` Toplam **${total}** kullanıcı bulunmakta. (\`${aktif} aktif\`)
\`~\` Toplam **${erkek+kız}** kayıtlı kullanıcı bulunmakta. (\`${erkek} erkek, ${kız} kız\`)
\`~\` Ses kanallarında toplam **${ses}** kullanıcı bulunmakta.
\`~\` Toplam **${nametaglı+discrimtaglı}** tagımızı alan kullanıcı bulunmakta. (\`${nametaglı} Guevara, ${discrimtaglı} #1947\`)
`))

};

exports.configuration = {
    name:'say',
    aliases:[]
}