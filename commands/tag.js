const { MessageEmbed } = require('discord.js');
let ayar = require('../ayar.json');

exports.run = async(client, message, args) => { 

    message.reply(`\`${ayar.tag} , #1947\``)

};

exports.configuration = {
    name:'tag',
    aliases:[]
}