export class TimeService {
  getNextSeconds(seconds) {
    let nextSeconds = seconds + 1;

    if (nextSeconds > 59) {
      nextSeconds = 0;
    }

    return nextSeconds;
  }

  getNextMinutes(minutes) {
    let nextMinutes = minutes + 1;

    if (nextMinutes > 59) {
      nextMinutes = 0;
    }

    return nextMinutes;
  }

  getNextHours(hours) {
    let nextHours = hours + 1;

    if (nextHours > 23) {
      nextHours = 0;
    }

    return nextHours;
  }

  formatValue(value) {
    let formattedValue = value.toString();
    if (formattedValue.length < 2) {
      formattedValue = '0' + formattedValue;
    } 

    return formattedValue;
  }
}