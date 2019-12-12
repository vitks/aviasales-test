import React from 'react';

import classes from './Button.module.css';

const button = ( props ) => {
    let classesArray = [classes.Button, classes[props.position]];
    
    if (props.value) {
        classesArray.push(classes.Active);
    }

    return(
        <button
            className={ classesArray.join(' ') }
            style={{ width: `${ props.width }%` }}
            onClick={ props.clicked }>{ props.children }</button>
    );
}

export default button;