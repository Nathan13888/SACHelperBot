export namespace Config {

  const ENV = process.env;

  // set prefix
  export let PREFIX: string;

  // CALL ONCE
  export function init(): void {
    // check token
    if (!Config.TOKEN) {
      throw new Error('Environment variable "DISCORD_TOKEN" is missing.');
    }
    if (Config.isProd) {
      PREFIX = '!!';
    } else {
      PREFIX = '@@';
    }
  }

  export function disconnect(): void {
    // DB.disconnect();
  }

  export const NODE_ENV: string = ENV.NODE_ENV;
  export const isProd: boolean = NODE_ENV==='production';
  export const TOKEN: string = ENV.DISCORD_TOKEN;
  export const BOTNAME: string = 'Polls Bot';
  export const COUNTERTOKEN: string = 'pollsbot';

  // VERSION
  const version = require('../package.json').version;
  export function getVersion(): string {
    return `${version} (${NODE_ENV})`;
  }
}
