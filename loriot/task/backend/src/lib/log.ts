'use strict';

export class Log {

  static write( label='log', msg: string, ...params: any[]) {

    const date = (new Date()).toISOString();

    switch ( label ) {

      case 'log':
        console.log(`${ date } - ${ label }: ${ msg }`, ...params);
        break;
      case 'info':
        console.info(`${ date } - ${ label }: ${ msg }`, ...params);
        break;
      case 'debug':
        console.debug(`${ date } - ${ label }: ${ msg }`, ...params);
        break;
      case 'warn':
        console.debug(`${ date } - ${ label }: ${ msg }`, ...params);
        break;
      case 'error':
        console.debug(`${ date } - ${ label }: ${ msg }`, ...params);
        break;

    }

  };

  static log(msg: string, ...params: any[]) { Log.write('log', msg, ...params); }

  static info(msg: string, ...params: any[]) { Log.write('info', msg, ...params); }

  static debug(msg: string, ...params: any[]) { Log.write('debug', msg, ...params); }

  static warn(msg: string, ...params: any[]) { Log.write('warn', msg, ...params); }

  static error(msg: string, ...params: any[]) { Log.write('error', msg, ...params); }

}
