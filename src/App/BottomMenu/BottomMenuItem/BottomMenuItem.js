import classes from './BottomMenuItem.module.css';

export function BottomMenuItem(props) {
  const selected = props.selected ?? false;

  let className = classes.BottomMenuItem;
  if (selected) {
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
