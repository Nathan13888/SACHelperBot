import {Bot} from '../bot';
import {Logger} from '../utils/logger';
import {Command} from '../commands/command';
import {Uptime} from '../commands/uptime';
import {Version} from '../commands/version';
import {Message} from 'discord.js';
import {Config} from '../config';
import {Counter} from './counter.service';
export namespace CommandService {

  export const commands: Array<Command> = [];

  export async function registerCommands() {
    // TODO: add command cooldown
    Bot.api.on('message', async (msg) => {
      if (msg.author.bot) return; // bots
      if (msg.content.substring(0, 2) === Config.PREFIX) {
        parseCommand(msg);
      }
    });

    // COMMANDS
    commands.push(new Version());
    commands.push(new Uptime());
  }

  export function findCommand(cmd: string): Command {
    // TODO: command mapping using HashMap, etc
    // TODO: macro alias detection (all-caps)
    for (const com of commands) {
      if (com.getAliases().includes(cmd)) {
        return com;
      }
    }
    return undefined;
  }

  // TODO: Use reply to make more clear replies to incorrect command usages
  async function parseCommand(msg: Message) {
    Logger.log(
      `${msg.author.tag} executed \`${msg.content}\``);
    Counter.addProcessed();
    // TODO: Improve regex to support single and double quotes.
    const args = msg.content.slice(2).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const com = findCommand(cmd);
    if (com) {
      const res: boolean = await com.exec(msg, args);
      if (!res) {
        // incorrect usage
        msg.react('❌');
        msg.reply('**Incorrect command usage**');
      }
      return;
    }
    msg.react('❌');
    msg.reply('**Command NOT found**');
  }
}
