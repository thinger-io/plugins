'use strict'

class Time {

  /**
   * Will return the milliseconds given a value ana magnitude
   */
  static toMilliseconds(value, magnitude) {
    let milliseconds = value;
    switch (magnitude) {
      case 'year':
        milliseconds = milliseconds * 365 * 24 * 60 * 60 * 1000;
        break;
      case 'week':
        milliseconds = milliseconds * 7;
      // fall through
      case 'day':
        milliseconds = milliseconds * 24;
      // fall through
      case 'hour':
        milliseconds = milliseconds * 60;
      // fall through
      case 'minute':
        milliseconds = milliseconds * 60 ;
      // fall through
      case 'second':
      default:
        milliseconds = milliseconds * 1000;
        break;
    }
    return milliseconds;
  }

}

module.exports = Time;
