import React from 'react';

import AlarmState from '../../models/AlarmState';

import classes from './Alarm.module.css';

export default class Alarm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: new AlarmState() };
    this.timer = null;
    this.alarmContainerRef = React.createRef();
    this.alarmCheckTimeIntervalMs = 1000 * 60;
  }

  onStartStopAlarmClick(event) {
    const target = event.target;

    if (target === this.alarmContainerRef.current) {
      if (this.state.value.isOn) {
        this.turnOffTimer();
      } else if (this.state.value.isAlarm) {
        this.turnOffAlarm();
      } else {
        this.turnOn();
      }
    }
  }

  turnOn() {    
    this.setState((state) => ({
      value: state.value.copyWith({  
        isOn: true,
      })
    }));

    this.runAlarm();
  }

  runAlarm() {
    if (this.checkTime()) {
      this.alarm();
      return;
    } 


    this.timer = setInterval(() => {
      if (this.checkTime()) {
        this.alarm();
      } 
    }, this.alarmCheckTimeIntervalMs);
  }

  showAlarm() {
    this.setState((state) => ({
      value: state.value.copyWith({
        isAlarm: true,
      })
    }));
  }

  checkTime() {
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    return (currentHours   === this.state.value.hours) && 
           (currentMinutes === this.state.value.minutes);
  }

  alarm() {    
    this.turnOffTimer();
    this.showAlarm();
  }

  turnOffTimer() {
    clearInterval(this.timer);

    this.setState((state) => ({
      value: state.value.copyWith({  
        isOn: false,
      })
    }));
  }

  turnOffAlarm() {
    this.setState((state) => ({
      value: state.value.copyWith({  
        isAlarm: false,
      })
    }));
  }

  onIncAlarmHoursClick() {
    if (this.state.value.isActived()) {
      return;
    }

    const currentHours = this.state.value.hours;

    let nextHours = currentHours + 1;
    if (nextHours > 23) {
      nextHours = 0;
    }
    
    this.setState((state) => ({
      value: state.value.copyWith({
        hours: nextHours,
      })
    }));
  }

  onIncAlarmMinutesClick() {
    if (this.state.value.isActived()) {
      return;
    }

    const currentMinutes = this.state.value.minutes;

    let nextMinutes = currentMinutes + 1;
    if (nextMinutes > 59) {
      nextMinutes = 0;
    }
    
    this.setState((state) => ({
      value: state.value.copyWith({
        minutes: nextMinutes,
      })
    }));
  }

  getAlarmClassName() {
    let className = classes.Alarm;
    if (this.state.value.isOn) {
      className += ' ' + classes.AlarmOn;
    } else if (this.state.value.isAlarm) {
      className += ' ' + classes.AlarmTriggered;
    }

    return className;
  }

  render() {
    return (
      <div 
        className={this.getAlarmClassName()}
        onClick={this.onStartStopAlarmClick.bind(this)}
      >

        <div className={classes.AlarmBorder}></div>

        <div 
          className={classes.AlarmContent}
          ref={this.alarmContainerRef}
        >

          <div 
            className={classes.Time}
            onClick={this.onIncAlarmHoursClick.bind(this)}
          >
            {this.state.value.getFormattedHours()}
          </div>

          <div className={classes.Separator}>:</div>
        
          <div 
            className={classes.Time}
            onClick={this.onIncAlarmMinutesClick.bind(this)}
          >
            {this.state.value.getFormattedMinutes()}
          </div>
        </div>
      </div>
    );
  }
}