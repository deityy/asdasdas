const { MessageEmbed } = require("discord.js");
const ayar = require('../ayar.json');
const kayıtlar = require('quick.db')

exports.run = async(client, message, args) => {

    if(!message.member.roles.cache.has(ayar.registerHammer) && !message.member.hasPermission(8)) return message.react(ayar.carpi)

    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if (!uye) return message.react(ayar.carpi)

    args = args.filter(a => a !== "" && a !== " ").splice(1)
    let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
    let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;
    if (!isim || !yaş) return message.react(ayar.carpi)
    let name = `• ${isim} ' ${yaş}`
    if(uye.user.username.includes(ayar.tag)) name = `${ayar.tag} ${isim} ' ${yaş}`

    if (uye.id === client.user.id) return message.react(ayar.carpi)
    if (uye.id === message.author.id) return message.react(ayar.carpi)

    message.channel.send(new MessageEmbed() .setDescription(`${uye} kullanıcısının takma adı ${message.author} tarafından \`${name}\` olarak değiştirildi.`)).then(x => x.delete({ timeout: 7000 }))

    await uye.setNickname(name)
    kayıtlar.push(`registerData.${uye.id}`, {
        Nickname: "İsim Değiştirme",
        Staff: message.author.id,
        Date: Date.now()
    })
}
exports.configuration = {
    aliases: ['nick','nickname'],
    name:'isim'
}