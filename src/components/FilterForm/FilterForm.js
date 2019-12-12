import React from 'react';

import Button from '../UI/Button/Button';
import Checkbox from '../UI/Checkbox/Checkbox';

import classes from './FilterForm.module.css';

const filterForm = (props) => {
    let elementsArray = [];
    let form = null;

    for (let key in props.filterForm.elements) {
        elementsArray.push({
            id: key,
            config: props.filterForm.elements[key]
        });
    }
    
    switch (props.filterForm.formType) {
        case ('BUTTON_FILTER'):
            let width = (100/elementsArray.length).toFixed(0).toString();

            form = elementsArray.map(element => (
                <Button
                    key={ element.id }
                    value={ element.config.value }
                    position={ element.config.position }
                    width={ width }
                    clicked={ () => props.filterButtonClicked(element.id) }>{ element.config.text }</Button>
            ));
        break;

        case ('CHECKBOX_FILTER'):
            form = elementsArray.map(element => (
                <Checkbox
                    key={ element.id }
                    value={ element.config.value }
                    clicked={ () => props.filterCheckboxClicked(element.id) }>{ element.config.text }</Checkbox>
            ));
        break;
            
        default:
            form = null;
    }

    return(
        <div classes={ classes.FilterForm }>
            { form }
        </div>
    );
}

export default filterForm;