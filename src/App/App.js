import classes from './App.module.css';
import { Component } from 'react';
import { AppState } from '../models/AppState';
import { Page } from './Page/Page';
import { Alarm } from './Alarm/Alarm';
import { Stopwatch } from './Stopwatch/Stopwatch';
import { Timer } from './Timer/Timer';
import { BottomMenu } from './BottomMenu/BottomMenu';
import { DiService } from '../services/DiService';

export class App extends Component {
  static contextType = DiService.context;

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
      <Page isTop={this.appService.isShowAlarm(this.state)}>
        <Alarm/>
      </Page>

      <Page isTop={this.appService.isShowStopwatch(this.state)}>
        <Stopwatch/>
      </Page>

      <Page isTop={this.appService.isShowTimer(this.state)}>
        <Timer/>
      </Page>
    </div>
  }

  render() {
    this.appService = this.context.appService;

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