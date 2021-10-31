import BottomMenuItemType from './BottomMenuItemType';

export default class AppState {
  constructor() {
    this.selectedBottomMenuItem = BottomMenuItemType.alarm;
  }

  copyWith(fields) {
    const newState = new AppState();

    newState.selectedBottomMenuItem = fields.selectedBottomMenuItem ?? this.selectedBottomMenuItem;

    return newState;
  }
}