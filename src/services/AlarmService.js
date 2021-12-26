export class AlarmService {
  isShouldAlarm(state) {
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    return (currentHours   === state.hours) && 
           (currentMinutes === state.minutes);
  }

  isActive(state) {
    return state.isOn || state.isAlarm;
  }

  getFormattedHours(state) {
    return this._formatValue(state.hours);
  }

  getFormattedMinutes(state) {
    return this._formatValue(state.minutes);
  }

  getNextMinutes(state) {
    const currentMinutes = state.minutes;

    let nextMinutes = currentMinutes + 1;
    if (nextMinutes > 59) {
      nextMinutes = 0;
    }

    return nextMinutes;
  }

  getNextHours(state) {
    const currentHours = state.hours;

    let nextHours = currentHours + 1;
    if (nextHours > 23) {
      nextHours = 0;
    }

    return nextHours;
  }

  _formatValue(value) {
    let formattedValue = value.toString();
    if (formattedValue.length < 2) {
      formattedValue = '0' + formattedValue;
    } 

    return formattedValue;
  }
}