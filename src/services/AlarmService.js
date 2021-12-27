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
}