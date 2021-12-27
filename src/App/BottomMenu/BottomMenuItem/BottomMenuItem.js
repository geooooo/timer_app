import { bool, func } from 'prop-types';
import classes from './BottomMenuItem.module.css';

export function BottomMenuItem(props) {
  let className = classes.BottomMenuItem;
  if (props.selected) {
    className += ' ' + classes.BottomMenuItemSelected;
  }

  return (
    <button 
      className={className}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

BottomMenuItem.propTypes = {
  selected: bool,
  onClick: func.isRequired,
}

BottomMenuItem.defaultProps = {
  selected: false,
}