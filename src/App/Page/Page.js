import classes from './Page.module.css';

export default function Page(props) {
  const isTop = props.isTop ?? false;
  
  let className = classes.Page + ' ' + (isTop? classes.Page : classes.PageOther);

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}
