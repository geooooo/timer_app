import classes from './BottomMenu.module.css';
import { BottomMenuItemType } from '../../models/BottomMenuItemType';
import { BottomMenuItem } from './BottomMenuItem/BottomMenuItem';
import { func, string } from 'prop-types';
import { memo } from 'react';

export const BottomMenu = memo((props) => {
  const isShowAlarm = props.selectedItem === BottomMenuItemType.alarm;
  const isShowStopwatch = props.selectedItem === BottomMenuItemType.stopwatch;
  const isShowTimer = props.selectedItem === BottomMenuItemType.timer;

  return (
    <div className={classes.BottomMenu}>
      
      <BottomMenuItem 
        selected={isShowAlarm}
        onClick={() => props.onItemClick(BottomMenuItemType.alarm)}>

        Alarm
      </BottomMenuItem>

      <BottomMenuItem
        selected={isShowStopwatch}
        onClick={() => props.onItemClick(BottomMenuItemType.stopwatch)}>

        Stopwatch
      </BottomMenuItem>

      <BottomMenuItem
        selected={isShowTimer}
        onClick={() => props.onItemClick(BottomMenuItemType.timer)}>

        Timer
      </BottomMenuItem>
    </div>
  );
});

BottomMenu.propTypes = {
  selectedItem: string.isRequired,
  onItemClick: func.isRequired,
};