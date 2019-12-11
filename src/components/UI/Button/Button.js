import React from 'react';

import classes from './Button.module.css';

const button = ( props ) => (
    <button
        className={ [classes.Button, classes[props.position], classes[props.type]].join(' ') }
        style={{ width: `${ props.width }%` }}
        onClick={ props.clicked }>{ props.children }</button>
);

export default button;