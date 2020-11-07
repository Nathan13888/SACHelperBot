import {Message} from 'discord.js';
import {Announcements} from '../services/announcements.service';
import {Utils} from '../utils/utils';
import {Command} from './command';

export class Test extends Command {
  getAliases(): string[] {
    return ['test'];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async exec(msg: Message, args: string[]): Promise<boolean> {
    Utils.sendDM(Announcements.getNotifEmbed(msg), msg.member.user);
    // else return false;
    return true;
  }

  getHelp(): string {
    return 'Test Commands';
  }
}
