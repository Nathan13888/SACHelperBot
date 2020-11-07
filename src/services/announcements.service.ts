import {Message} from 'discord.js';
import {Bot} from '../bot';
import {Utils} from '../utils/utils';

export namespace Announcements {
    export function getNotifEmbed(msg: Message) {
      const mess = msg.content;
      const preview = (mess.length>80?mess.substr(0, 77)+'...':mess);
      const notif = Utils.getDefEmbed()
        .setTitle('Announcement Notification')
        .setThumbnail(msg.author.displayAvatarURL())
        .setDescription(`You may unsubscribe by running \`unsub\`
on the SAC Discord Server.`)
        .addField('Preview:', '```\n'+preview+'\n```')
        .setFooter(`Announcement from ${msg.member.displayName}`,
          Bot.api.user.displayAvatarURL())
        .setTimestamp();
      return notif;
    }
}
