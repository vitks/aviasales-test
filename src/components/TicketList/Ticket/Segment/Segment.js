import React from 'react';

import Block from './Block/Block';

import classes from './Segment.module.css';

const segment = (props) => {
    const form = props.blockArray.map((_, i) => {
        return <Block key={ i } blockObj={ props.blockArray[i] } />;
    });

    return(
        <div className={ classes.Segment }>
            { form }
        </div>
    );
}

export default segment;