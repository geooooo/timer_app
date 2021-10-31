import React from 'react';

import classes from './App.module.css';

import AppState from '../models/AppState';
import Page from './Page/Page';
import Alarm from './Alarm/Alarm';
import Stopwatch from './Stopwatch/Stopwatch';
import Timer from './Timer/Timer';
import BottomMenu from './BottomMenu/BottomMenu';
import BottomMenuItemType from '../models/BottomMenuItemType';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: new AppState() };
    this.onBottomMenuItemClick = this.onBottomMenuItemClick.bind(this);
  }

  onBottomMenuItemClick(itemType) {
    this.setState((state) => ({
      value: state.value.copyWith({
        selectedBottomMenuItem: itemType,
      })
    }));
  }

  buildPages() {
    return <div className={classes.PageContainer}>
      <Page isTop={this.state.value.selectedBottomMenuItem === BottomMenuItemType.alarm}>
        <Alarm />
      </Page>

      <Page isTop={this.state.value.selectedBottomMenuItem === BottomMenuItemType.stopwatch}>
        <Stopwatch />
      </Page>

      <Page isTop={this.state.value.selectedBottomMenuItem === BottomMenuItemType.timer}>
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
          selectedItem={this.state.value.selectedBottomMenuItem}
          onItemClick={this.onBottomMenuItemClick}/>
      </div>
    );
  }
}