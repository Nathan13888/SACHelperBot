import {GuildMember, PartialGuildMember} from 'discord.js';

export namespace Roles {
  export function has(member: GuildMember | PartialGuildMember,
    id: string): boolean {
    return member.roles.cache.some((role) => role.id===id);
  }
  export function add(member: GuildMember | PartialGuildMember,
    id: string): boolean {
    if (!member.user.bot) { // not a bot
      member.roles.add(id);
      return true;
    }
    return false;
  }
  export function remove(member: GuildMember | PartialGuildMember,
    id: string): boolean {
    if (has(member, id)) {
      member.roles.remove(id); // optional: reason
      return true;
    }
    return false;
  }
}
