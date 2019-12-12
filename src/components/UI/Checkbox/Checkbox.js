import React from 'react';

import checkboxOn from '../../../assets/images/checkbox-on.png';
import checkboxOff from '../../../assets/images/checkbox-off.png';

import classes from './Checkbox.module.css';

const checkbox = (props) => (
        <div className={ classes.Container } onClick={ props.clicked }>
            { props.value ?
                <img
                    src={ checkboxOn }
                    alt='Checkbox' /> :
                <img
                    src={ checkboxOff }
                    alt='Checkbox' />
            }
            { props.children }
        </div>
);

export default checkbox;