import React from 'react';

import classes from './Block.module.css';

const block = (props) => (
    <div className={ classes.Block }>
        <span className={ classes.Title }>{ props.blockObj.title }</span>
        <span className={ classes.Content }>{ props.blockObj.content }</span>
    </div>
);

export default block;