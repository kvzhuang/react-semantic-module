
import React from 'react';
import classnames from 'classnames';
import CSSModules from 'react-css-modules';
import style from './style.css';

export default CSSModules(({ label, icon, active, onToggle, onLink, style }) => (
  <li
    styleName={"toolbar-icon " + classnames({ active })}
    onMouseDown={(e) => {
      e.preventDefault();
	  if( style === 'LINK'){
		  onLink();
	  }
      else onToggle(style)
    }}
  >
    {label ? label : <i className={icon}></i>}
  </li>
),style, { allowMultiple: true });