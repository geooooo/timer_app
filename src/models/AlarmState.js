export default class AlarmState {
  constructor() {
    this.hours = 18;
    this.minutes = 28;
    this.isOn = false;
    this.isAlarm = false;
  }

  copyWith(fields) {
    const newState = new AlarmState();

    newState.hours = fields.hours ?? this.hours;
    newState.minutes = fields.minutes ?? this.minutes;
    newState.isOn = fields.isOn ?? this.isOn;
    newState.isAlarm = fields.isAlarm ?? this.isAlarm;

    return newState;
  }

  isActived() {
    return this.isOn || this.isAlarm;
  }

  getFormattedHours() {
    return this._getFormattedValue(this.hours);
  }

  getFormattedMinutes() {
    return this._getFormattedValue(this.minutes);
  }

  _getFormattedValue(value) {
    let formattedValue = value.toString();
    if (formattedValue.length < 2) {
      formattedValue = '0' + formattedValue;
    } 

    return formattedValue;
  }
}