import React from 'react';
import classes from './App.module.css';
import { AppState } from '../models/AppState';
import { Page } from './Page/Page';
import { Alarm } from './Alarm/Alarm';
import { Stopwatch } from './Stopwatch/Stopwatch';
import { Timer } from './Timer/Timer';
import { BottomMenu } from './BottomMenu/BottomMenu';
import { AppService } from '../services/AppService';

export class App extends React.Component {
  static appService = new AppService();

  constructor(props) {
    super(props);

    this.state = new AppState();
    this.onBottomMenuItemClick = this.onBottomMenuItemClick.bind(this);
  }

  onBottomMenuItemClick(itemType) {
    this.setState({ selectedBottomMenuItem: itemType });
  }

  buildPages() {
    return <div className={classes.PageContainer}>
      <Page isTop={App.appService.isShowAlarm(this.state)}>
        <Alarm />
      </Page>

      <Page isTop={App.appService.isShowStopwatch(this.state)}>
        <Stopwatch />
      </Page>

      <Page isTop={App.appService.isShowTimer(this.state)}>
        <Timer />
      </Page>
    </div>
  }

  render() {
    return (
      <div className={classes.App}>
        <header className={classes.Header}>
          <h1>React Timer</h1>
        </header>

        {this.buildPages()}

        <BottomMenu 
          selectedItem={this.state.selectedBottomMenuItem}
          onItemClick={this.onBottomMenuItemClick}/>
      </div>
    );
  }
}