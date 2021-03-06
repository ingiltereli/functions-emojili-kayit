const db = require('quick.db');
const { MessageEmbed, Message } = require('discord.js')
module.exports = {
    name: 'isimler',
    aliases: ['isimler', 'geçmiş'],

    run: async(client, message, args) => {
        if (!client.config.mods.some(id => message.member.roles.cache.has(id))) {
            return msg.react('⚠️')
        }
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("Öncellikle Bir Kullanıcı Belirtmelisin.")
        let isimler = db.get(`isimler_${member.user.id}`);
        if (!isimler) return message.channel.send("Bu Kullanıcının Daha Öncedenki İsmi Bulunmuyor.")
        const embed = new MessageEmbed()
            .setColor('#2F3136') //
            .setTitle("Bu kullanıcı daha önceden")
            .setDescription(isimler.map((data, i) => `**${i + 1}.** ${data}`).join("\n") + `\nisimlerinde kayıt olmuş.`)
            .setFooter('İngiltereli X Muratva Stark X Niwren')
            .setThumbnail(member.displayName, member.user.avatarURL({ dynamic: true }))
            .setTimestamp()
        message.channel.send(embed)
    }
}