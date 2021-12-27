import classes from './Stopwatch.module.css';
import { useContext, useEffect, useState } from 'react';
import { DiService } from '../../services/DiService';
import { StopwatchState } from '../../models/StopwatchState';

export function Stopwatch() {
  const stopwatchService = useContext(DiService.context).stopwatchService;
  const timeService = useContext(DiService.context).timeService;

  const [state, setState] = useState(new StopwatchState());

  useEffect(() => {
    if (state.isOn) {
      Stopwatch.timer = setTimeout(tick, 1000);
    } else {
      clearTimeout(Stopwatch.timer);
    }
  });

  const formattedHours = timeService.formatValue(state.hours);
  const formattedMinutes = timeService.formatValue(state.minutes);
  const formattedSeconds = timeService.formatValue(state.seconds);

  function updateState(updates) {
    setState(prevState => ({ ...prevState, ...updates }));
  }

  function tick() {
    const { nextHours, nextMinutes, nextSeconds } = stopwatchService.incSeconds(state);

    updateState({
      hours: nextHours,
      minutes: nextMinutes,
      seconds: nextSeconds,
    });
  }

  function turnOn() {
    updateState({ 
      isOn: true,
      hours: 0,
      minutes: 0,
      seconds: 0,
     });
  }

  function turnOff() {
    updateState({ isOn: false });
  }

  function onStartStopStopwatchClick() {
    if (state.isOn) {
      turnOff();
    } else {
      turnOn();
    }
  }

  function getStopwatchClassName() {
    let className = classes.Stopwatch;

    if (state.isOn) {
      className += ' ' + classes.StopwatchOn;
    } 

    return className;
  }

  return (
    <div 
      onClick={onStartStopStopwatchClick}
      className={getStopwatchClassName()}>

      <div className={classes.StopwatchBorder}/>

      <div className={classes.StopwatchContent}>
        
        <div className={classes.Time}>
          { formattedHours }
        </div>

        <div className={classes.Separator}>:</div>

        <div className={classes.Time}>
          { formattedMinutes }
        </div>

        <div className={classes.Separator}>:</div>
      
        <div className={classes.Time}>
          { formattedSeconds }
        </div>
      </div>
    </div>
  );
}

Stopwatch.timer = null;