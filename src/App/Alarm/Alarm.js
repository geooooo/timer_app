import classes from './Alarm.module.css';
import { Component, createRef } from 'react';
import { AlarmState } from '../../models/AlarmState';
import { DiService } from '../../services/DiService';

export class Alarm extends Component {
  static contextType = DiService.context;
  static alarmCheckTimeIntervalMs = 1000 * 60;

  constructor(props) {
    super(props);

    this.state = new AlarmState();
    this.timer = null;
    this.alarmContainerRef = createRef();
    this.onStartStopAlarmClick = this.onStartStopAlarmClick.bind(this);
    this.onIncAlarmHoursClick = this.onIncAlarmHoursClick.bind(this);
    this.onIncAlarmMinutesClick = this.onIncAlarmMinutesClick.bind(this);
  }

  get formattedHours() {
    return this.timeService.formatValue(this.state.hours);
  }
  
  get formattedMinutes() {
    return this.timeService.formatValue(this.state.minutes);
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
    
    this.setState({ hours: this.timeService.getNextHours(this.state.hours) });
  }

  onIncAlarmMinutesClick() {
    if (this.alarmService.isActive(this.state)) {
      return;
    }
    
    this.setState({ minutes: this.timeService.getNextMinutes(this.state.minutes) });
  }

  render() {
    this.alarmService = this.context.alarmService;
    this.timeService = this.context.timeService;

    return (
      <div 
        className={this.alarmClassName}
        onClick={this.onStartStopAlarmClick}>

        <div className={classes.AlarmBorder}/>

        <div 
          className={classes.AlarmContent}
          ref={this.alarmContainerRef}>

          <div 
            className={classes.Time}
            onClick={this.onIncAlarmHoursClick}>
            
            {this.formattedHours}
          </div>

          <div className={classes.Separator}>:</div>
        
          <div 
            className={classes.Time}
            onClick={this.onIncAlarmMinutesClick}>
              
            {this.formattedMinutes}
          </div>
        </div>
      </div>
    );
  }
}