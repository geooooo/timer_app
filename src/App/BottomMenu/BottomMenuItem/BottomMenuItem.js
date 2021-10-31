import classes from './BottomMenuItem.module.css';

export default function BottomMenuItem(props) {
  const selected = props.selected ?? false;
  const onClick = props.onClick;

  let className = classes.BottomMenuItem;
  if (selected) {
    className += ' ' + classes.BottomMenuItemSelected;
  }

  return (
    <button 
      className={className}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
}
