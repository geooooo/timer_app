import classes from './Alarm.module.css';
import { Component, createRef } from 'react';
import { AlarmState } from '../../models/AlarmState';

export class Alarm extends Component {
  static alarmCheckTimeIntervalMs = 1000 * 60;

  constructor(props) {
    super(props);

    this.state = new AlarmState();
    this.alarmService = props.alarmService;
    this.timer = null;
    this.alarmContainerRef = createRef();
    this.onStartStopAlarmClick = this.onStartStopAlarmClick.bind(this);
    this.onIncAlarmHoursClick = this.onIncAlarmHoursClick.bind(this);
    this.onIncAlarmMinutesClick = this.onIncAlarmMinutesClick.bind(this);
  }

  get formattedHours() {
    return this.alarmService.getFormattedHours(this.state);
  }
  
  get formattedMinutes() {
    return this.alarmService.getFormattedMinutes(this.state);
  }

  get alarmClassName() {
    let className = classes.Alarm;

    if (this.state.isOn) {
      className += ' ' + classes.AlarmOn;
    } else if (this.state.isAlarm) {
      className += ' ' + classes.AlarmTriggered;
    }

    return className;
  }

  turnOn() {    
    this.setState({ isOn: true });

    this.runAlarm();
  }

  runAlarm() {
    if (this.alarmService.isShouldAlarm(this.state)) {
      this.alarm();
      return;
    } 

    this.timer = setInterval(() => {
      if (this.alarmService.isShouldAlarm(this.state)) {
        this.alarm();
      } 
    }, this.alarmCheckTimeIntervalMs);
  }

  showAlarm() {
    this.setState({ isAlarm: true });

    window.alert(`Alarm: ${this.formattedHours}:${this.formattedMinutes} !`);
  }

  alarm() {    
    this.turnOffTimer();
    this.showAlarm();
  }

  turnOffTimer() {
    clearInterval(this.timer);
    
    this.setState({ isOn: false });
  }

  turnOffAlarm() {
    this.setState({ isAlarm: false });
  }

  onStartStopAlarmClick(event) {
    if (event.target !== this.alarmContainerRef.current) {
      return;
    }

    if (this.state.isOn) {
      this.turnOffTimer();
    } else if (this.state.isAlarm) {
      this.turnOffAlarm();
    } else {
      this.turnOn();
    }
  }

  onIncAlarmHoursClick() {
    if (this.alarmService.isActive(this.state)) {
      return;
    }
    
    this.setState({ hours: this.alarmService.getNextHours(this.state) });
  }

  onIncAlarmMinutesClick() {
    if (this.alarmService.isActive(this.state)) {
      return;
    }
    
    this.setState({ minutes: this.alarmService.getNextMinutes(this.state) });
  }

  render() {
    return (
      <div 
        className={this.alarmClassName}
        onClick={this.onStartStopAlarmClick}
      >

        <div className={classes.AlarmBorder}></div>

        <div 
          className={classes.AlarmContent}
          ref={this.alarmContainerRef}
        >

          <div 
            className={classes.Time}
            onClick={this.onIncAlarmHoursClick}
          >
            {this.formattedHours}
          </div>

          <div className={classes.Separator}>:</div>
        
          <div 
            className={classes.Time}
            onClick={this.onIncAlarmMinutesClick}
          >
            {this.formattedMinutes}
          </div>
        </div>
      </div>
    );
  }
}