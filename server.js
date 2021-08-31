const Discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const ayar = require('./ayar.json');
const moment = require('moment');
var client = global.client = new Discord.Client();
require('./util/eventLoader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(dosya => {
      let props = require(`./commands/${dosya}`);
      console.log(`${props.configuration.name} komutu yüklendi.`);
      client.commands.set(props.configuration.name, props);
      props.configuration.aliases.forEach(alias => {
          client.aliases.set(alias, props.configuration.name);
      });
  });
});

client.elevation = message => {
if (!message.guild) {
return;
}
let permlvl = 0;
if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
if (message.author.id === ayar.sahip) permlvl = 4;
return permlvl;
};

Date.prototype.toTurkishFormatDate = function (format) {
  let date = this,
    day = date.getDate(),
    weekDay = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
  let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

  if (!format) {
    format = "dd MM yyyy | hh:ii:ss";
  };
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);
  
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  };
  
  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);

  if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("hh") > -1) {
    if (hours > 24) hours -= 24;
    if (hours === 0) hours = 24;
    format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
  };
  if (format.indexOf("ii") > -1) format = format.replace("ii", minutes.toString().replace(/^(\d)$/, '0$1'));
  if (format.indexOf("ss") > -1) format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
  return format;
};

client.on("ready", async() => {
  let channel = client.channels.cache.get("858005199121416202")
  if(channel) channel.join();
  client.user.setPresence({ activity: {name:'Orchais ❤️ Guevara' }})
})

const invites = {};
const wait = require("util").promisify(setTimeout);
client.on("ready", () => {
  wait(1000);
  client.guilds.cache.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

const sayiEmojiler = {
  0:"<a:sifir:857200407126474792>", 1:"<a:bir:857199951205761024>", 2:"<a:iki:857199979495555082>", 3:"<a:uc:857200015993470976>",
  4:"<a:dort:857200077835730946>", 5:"<a:bes:857200177935548456>", 6:"<a:alti:857200209171709972>", 7:"<a:yedi:857200277735866398>",
  8:"<a:sekiz:857200306461605888>", 9:"<a:dokuz:857200342533144576>"
}

client.emojiSayi = function(sayi) {
  var yeniMetin = "";
  var arr = Array.from(sayi);
  for (var x = 0; x < arr.length; x++) {
    yeniMetin += (sayiEmojiler[arr[x]] === "" ? arr[x] : sayiEmojiler[arr[x]]);
  }
  return yeniMetin;
};

client.on("guildMemberAdd", member => {
    
    if (member.user.bot) return;

    member.roles.add(ayar.unregisteredRole)

    let date = moment(member.user.createdAt)
       const startedAt = Date.parse(date);
       var msecs = Math.abs(new Date() - startedAt);
         
       const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
       msecs -= years * 1000 * 60 * 60 * 24 * 365;
       const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
       msecs -= months * 1000 * 60 * 60 * 24 * 30;
       const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
       msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
       const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
       msecs -= days * 1000 * 60 * 60 * 24;
       const hours = Math.floor(msecs / (1000 * 60 * 60));
       msecs -= hours * 1000 * 60 * 60;
       const mins = Math.floor((msecs / (1000 * 60)));
       msecs -= mins * 1000 * 60;
       const secs = Math.floor(msecs / 1000);
       msecs -= secs * 1000;
         
       var string = "";
       if (years > 0) string += `${years} yıl ${months} ay`
       else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
       else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
       else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
       else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
       else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
       else if (secs > 0) string += `${secs} saniye`
           
         
       string = string.trim();
   
       let log = client.channels.cache.get(ayar.welcomeRoom);
       let endAt = member.user.createdAt
       let gün = moment(new Date(endAt).toISOString()).format('DD')
       let ay = moment(new Date(endAt).toISOString()).format('MM').replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
       let yıl = moment(new Date(endAt).toISOString()).format('YYYY')
       let saat = moment(new Date(endAt).toISOString()).format('HH:mm')
       let kuruluş = `${gün} ${ay} ${yıl} ${saat}`;
       const kurulus = member.user.createdAt.getTime();
       log.send(`
Sunucumuza hoş geldin ${member}(\`${member.user.username}\`)
   
Hesabın **${moment(kurulus).locale('tr').format('LL')}** tarihinde (\`${string} önce\`) oluşturulmuş.
 
Tagımızı(\`Guevara , #1947\`) aldıktan sonra kayıt olmak için <@&${ayar.registerHammer}> yetkilileri seninle ilgilenecektir.
 
Sunucu kurallarımız <#${ayar.rulesChannel}> kanalında yazıyor okumayı unutma! **ceza-i işlemlerin** kuralları okuduğunu varsayarak gerçekleştirilecek.
   
Seninle birlikte **${client.emojiSayi(`${member.guild.memberCount}`)}** üyeye ulaştık! :tada::tada::tada:.
`)
});

client.on('userUpdate', async(old, nev) => {
  let guild = await (client.guilds.cache.get(ayar.guildID))
  let uye = guild.members.cache.get(old.id)

  let embed = new Discord.MessageEmbed().setColor('RANDOM').setFooter('Orchais ❤️ Guevara').setTimestamp()
  let tagrol = guild.roles.cache.get(ayar.teamRole);
  let log = guild.channels.cache.get(ayar.welcomeRoom)
  let logtwo = guild.channels.cache.get("857983384486674453")
      if (old.username != nev.username || old.tag != nev.tag || old.discriminator != nev.discriminator || !old.bot || !nev.bot) {

  if (ayar.tagges.some(tag => nev.tag.toLowerCase().includes(tag))) {
      if (!uye.roles.cache.has(tagrol.id)) {
          uye.roles.add(tagrol.id).catch(e => {});
          if (log) log.send(embed.setDescription(`${uye}, adlı kullanıcı tagımızı aldı! Kayıt olmak için sadece isim yaş söylemesi yeterli.`))
		if (logtwo) logtwo.send(embed.setDescription(`${uye}, adlı kullanıcı tagımızı aldı! Kayıt olmak için sadece isim yaş söylemesi yeterli.`))
      }

  } else {
      if (!uye.roles.cache.has(tagrol.id)) {
      } else {
          uye.roles.set([ayar.unregisteredRole]).catch(e => {});
          if (log) log.send(embed.setDescription(`${uye}, adlı kullanıcı tagımızı çıkardı! Kayıt olmak için tagımızı(\`Guevara , #1947\`) alman gerek.`))
		  if (logtwo) logtwo.send(embed.setDescription(`${uye}, adlı kullanıcı tagımızı çıkardı! Kayıt olmak için tagımızı(\`Guevara , #1947\`) alman gerek.`))

      }
  }
    }
})

client.on("message", async(message) => {
	let reklamlar = ["discord.gg",".gg/","gg/","https://discord.gg/"]
	if(reklamlar.some(r => message.content.includes(r))) message.delete();
})

client.login(ayar.token).then((x) => console.log(`${client.user.tag} Profili aktif edildi.`)).catch((err) => console.log(err));