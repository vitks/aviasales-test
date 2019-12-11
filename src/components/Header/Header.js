import React from 'react';

import planeLogo from '../../assets/images/plane-logo.png';

import classes from './Header.module.css';

const header = () => (
    <div className={ classes.Header }>
        <img src={ planeLogo } alt='Plane' style={{ margin: '0 auto' }} />
    </div>
);

export default header;
