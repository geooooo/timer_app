import { BottomMenuItemType } from '../models/BottomMenuItemType';

export class AppService {
  isShowAlarm(state) {
    return state.selectedBottomMenuItem === BottomMenuItemType.alarm;
  }

  isShowStopwatch(state) {
    return state.selectedBottomMenuItem === BottomMenuItemType.stopwatch;
  }

  isShowTimer(state) {
    return state.selectedBottomMenuItem === BottomMenuItemType.timer;
  }
}