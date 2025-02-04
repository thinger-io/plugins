'use strict';

export class Log {

  static log(msg: string, label='log') {

    const date = (new Date()).toISOString();

    switch ( label ) {

      case 'log':
        console.log(`${ date } - ${ label }: ${ msg }`);
        break;
      case 'info':
        console.info(`${ date } - ${ label }: ${ msg }`);
        break;
      case 'debug':
        console.debug(`${ date } - ${ label }: ${ msg }`);
        break;
      case 'warn':
        console.debug(`${ date } - ${ label }: ${ msg }`);
        break;
      case 'error':
        console.debug(`${ date } - ${ label }: ${ msg }`);
        break;

    }

  };

  static info(msg: string) { Log.log(msg,'info'); }

  static debug(msg: string) { Log.log(msg,'debug'); }

  static warn(msg: string) { Log.log(msg,'warn'); }

  static error(msg: string) { Log.log(msg,'error'); }

}
