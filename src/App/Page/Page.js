import classes from './Page.module.css';

export function Page(props) {
  const isTop = props.isTop ?? false;
  
  let className = classes.Page;
  if (isTop) {
    className += ' ' + classes.PageVisible;
  }

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}
