import classes from './Page.module.css';
import { bool, element } from 'prop-types';

export function Page(props) {  
  let className = classes.Page;
  if (props.isTop) {
    className += ' ' + classes.PageVisible;
  }

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}

Page.propTypes = {
  isTop: bool,
  children: element.isRequired,
};

Page.defaultProps = {
  isTop: false,
};
