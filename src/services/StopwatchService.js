export class StopwatchService {
  constructor(timeService) {
    this._timeService = timeService;
  }

  incSeconds(state) {
    const nextSeconds = this._timeService.getNextSeconds(state.seconds);
    const nextMinutes = (nextSeconds === 0 && state.seconds !== 0)
      ? this._timeService.getNextMinutes(state.minutes)
      : state.minutes;
    const nextHours = (nextMinutes === 0 && state.minutes !== 0)
      ? this._timeService.getNextHours(state.hours)
      : state.hours; // TODO: case when hours is overflowed

    return {
      nextHours: nextHours,
      nextMinutes: nextMinutes,
      nextSeconds: nextSeconds,
    };
  }
}