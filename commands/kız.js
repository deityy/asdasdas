const { MessageEmbed } = require('discord.js');
const ayar = require('../ayar.json');
const register = require('quick.db');

exports.run = async(client, message, args) => { 

if(!message.member.roles.cache.has(ayar.registerHammer) && !message.member.hasPermission("ADMINISTRATOR")) return message.react(ayar.carpi)
if(message.channel.id !== "857983395568156702") return message.reply(`Kayıt komutlarını sadece ${client.channels.cache.get("857983395568156702")} kanalında kullanabilirsin.`).then(x => x.delete({timeout:2200}))

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.id == args[0])
if (!member && !message.guild.member(member)) return message.reply(new MessageEmbed().setThumbnail(message.guild.iconURL({ dynamic:true })).setAuthor(message.author.username, message.author.displayAvatarURL({ dymamic:true })).setDescription(`Kayıt etmek için geçerli bir üye etiketle.\n\nÖrnek: \`.kız @Orchais/ID <İsim> <Yaş>\``)).then((x) => x.delete({ timeout:5000 }))

args = args.filter(a => a !== "" && a !== " ").splice(1)
let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
if (!isim || !yaş) return message.reply(`İsim ve Yaş girmelisin. Örnek: \`.erkek @Orchais/ID <İsim> <Yaş>\``).then(x => x.delete({ timeout:2000}))
let name = `• ${isim} ' ${yaş}`

if(member.id === client.user.id) return message.reply(new MessageEmbed().setThumbnail(message.guild.iconURL({ dynamic:true })).setAuthor(message.author.username, message.author.displayAvatarURL({ dymamic:true })).setDescription(`Beni kayıt edemezsin.\n\nÖrnek: \`.kız @Orchais/ID <İsim> <Yaş>\``)).then((x) => x.delete({ timeout:5000 }))
if(member.id === message.author.id) return message.reply(new MessageEmbed().setThumbnail(message.guild.iconURL({ dynamic:true })).setAuthor(message.author.username, message.author.displayAvatarURL({ dymamic:true })).setDescription(`Kendini kayıt edemezsin.\n\nÖrnek: \`.kız @Orchais/ID <İsim> <Yaş>\``)).then((x) => x.delete({ timeout:5000 }))
if(member.roles.cache.has(ayar.womanRoles)) return message.reply(new MessageEmbed().setThumbnail(message.guild.iconURL({ dynamic:true })).setAuthor(message.author.username, message.author.displayAvatarURL({ dymamic:true })).setDescription(`Kayıt etmeye çalıştığın kullanıcı zaten kayıtlı.`)).then((x) => x.delete({ timeout:5000 }))
if(!member.user.username.includes("Guevara") && !member.user.username.includes("guevara") && !member.user.discriminator.includes("1947") && !member.roles.cache.has(ayar.boosterRole)) return message.reply(new MessageEmbed().setThumbnail(message.guild.iconURL({ dynamic:true })).setAuthor(message.author.username, message.author.displayAvatarURL({ dymamic:true })).setDescription(`Hey, şuanda taglı alımdayız! Kullanıcıyı kayıt etmek için tagı alması veya sunucuya boost basması lazım. \`${ayar.tag} , #1947\``)).then((x) => x.delete({ timeout:5000 }))

setTimeout(() => {
	 member.roles.remove(ayar.unregisteredRole)
    member.roles.add(ayar.womanRoles)
    member.roles.remove(ayar.unregisteredRole)
   },800)
   
    setTimeout(() => {
    member.setNickname(name)
    member.roles.add(ayar.teamRole)
    }, 1500)

let teyitSayi = register.get(`teyit.${message.author.id}.t`) || 0;

setTimeout(() => {
message.react(ayar.tik)
message.channel.send(new MessageEmbed().setDescription(`
 ${member} üyesi ${message.author} tarafından **kız** üye olarak kaydedildi.
 
(\`${name}\`)

\`•\` Verilen roller: **${message.guild.roles.cache.get("857983338480271360")}, ${message.guild.roles.cache.get("857983339378376724")}, ${message.guild.roles.cache.get("857983340309381169")}**
\`•\` Yetkilinin toplam teyiti: **${teyitSayi+1}**
\`•\` Teyit tarihi: **${new Date(Date.now()).toTurkishFormatDate()}**

Üyenin eski kayıtlarına bakmak için \`.isimler @Orchais/ID\` yazman yeterli.
 `) .setTimestamp().setFooter("Orchais ❤️ Guevara").setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true })).setThumbnail(message.author.avatarURL({ dynamic:true })).setColor("RANDOM"))
}, 1800)

setTimeout(() => {
 register.add(`teyit.${message.author.id}.k`, 1)
 register.add(`teyit.${message.author.id}.t`, 1)
 register.push(`registerData.${member.id}`, {
    Nickname: name,
    Gender: "woman",
    Staff: message.author.id,
    Date: Date.now()
})
}, 2000)
};

exports.configuration = {
    name:'kadın',
    aliases:["k","kız"]
};