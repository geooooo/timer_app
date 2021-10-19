import React from 'react';

import classes from './App.module.css';

import BottomMenuItemType from './models/BottomMenuItemType';
import Stopwatch from './Stopwatch/Stopwatch';
import Page from './Page/Page';
import BottomMenu from './BottomMenu/BottomMenu';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: BottomMenuItemType.alarm,
    };
    this.onBottomMenuItemClick = this.onBottomMenuItemClick.bind(this);
  }

  onBottomMenuItemClick(itemType) {
    this.setState({selectedItem: itemType});
  }

  render() {
    return (
      <div className={classes.App}>
        <header className={classes.Header}>
          <h1>React Timer</h1>
        </header>

        {/* <Stopwatch /> */}
        {/* <Page /> */}

        <BottomMenu 
          selectedItem={this.state.selectedItem}
          onItemClick={this.onBottomMenuItemClick}/>
      </div>
    );
  }
}