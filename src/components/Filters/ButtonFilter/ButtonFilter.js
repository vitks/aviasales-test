import React from 'react';

import Button from '../../UI/Button/Button';

import classes from './ButtonFilter.module.css';

const buttonFilter = ( props ) => {
    let elementsArray = [];

    for (let key in props.filterForm) {
        elementsArray.push({
            id: key,
            config: props.filterForm[key]
        });
    }
    
    let width = (100/elementsArray.length).toFixed(0).toString();
    
    let form = elementsArray.map( element => (
        <Button
            key={ element.id }
            type={ element.config.type }
            position={ element.config.position }
            width={ width }
            clicked={ () => props.filterButtonClicked( element.id ) }>{ element.config.text }</Button>
    ));

    return(
        <div classes={ classes.ButtonFilter }>
            { form }
        </div>
    );
}

export default buttonFilter;