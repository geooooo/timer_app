import React from 'react';

import classes from './BottomMenu.module.css';

import BottomMenuItemType from '../../models/BottomMenuItemType';
import BottomMenuItem from './BottomMenuItem/BottomMenuItem';

export default function BottomMenu(props) {
  const selectedItem = props.selectedItem;
  const onItemClick = props.onItemClick;

  return (
    <div className={classes.BottomMenu}>
      <BottomMenuItem 
        selected={selectedItem === BottomMenuItemType.alarm}
        onClick={() => onItemClick(BottomMenuItemType.alarm)}
      >
        Alarm
      </BottomMenuItem>

      <BottomMenuItem
        selected={selectedItem === BottomMenuItemType.stopwatch}
        onClick={() => onItemClick(BottomMenuItemType.stopwatch)}
      >
        Stopwatch
      </BottomMenuItem>

      <BottomMenuItem
        selected={selectedItem === BottomMenuItemType.timer}
        onClick={() => onItemClick(BottomMenuItemType.timer)}
      >
        Timer
      </BottomMenuItem>
    </div>
  );
}
