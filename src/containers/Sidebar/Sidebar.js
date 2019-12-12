import React, { Component } from 'react';

import FilterForm from '../../components/FilterForm/FilterForm';

import classes from './Sidebar.module.css';

class Sidebar extends Component {
    state = {
        filterForm: {
            formType: 'CHECKBOX_FILTER',
            elements: {
                allOptions: {
                    text: 'Все',
                    value: true
                },
                noTransfer: {
                    text: 'Без пересадок',
                    value: true
                },
                oneTransfer: {
                    text: '1 пересадка',
                    value: true
                },
                twoTransfers: {
                    text: '2 пересадки',
                    value: true
                },
                threeTransfers: {
                    text: '3 пересадки',
                    value: true
                }
            }
        }
    }

    filterCheckboxHandler = (formElement) => {
        const { filterForm } = this.state;
        let updatedFilterForm = null;

        if (formElement !== 'allOptions') {
            updatedFilterForm = {
                ...filterForm,
                elements: {
                    ...filterForm.elements,
                    [formElement]: {
                        ...filterForm.elements[formElement],
                        value: !filterForm.elements[formElement].value
                    },
                    allOptions: {
                        ...filterForm.elements.allOptions,
                        value: false
                    }
                }
            }

            let counter = Object.keys(updatedFilterForm.elements).length - 1;

            for (let key in updatedFilterForm.elements) {
                if (key !== 'allOptions' && updatedFilterForm.elements[key].value === true) {
                    counter -= 1;
                }
            }

            if (counter === 0) {
                updatedFilterForm.elements.allOptions.value = true;
            }
        } else {
            updatedFilterForm = {
                ...filterForm,
                elements: {
                    ...filterForm.elements,
                    [formElement]: {
                        ...filterForm.elements[formElement],
                        value: !filterForm.elements[formElement].value
                    }
                }
            }
            
            for (let key in updatedFilterForm.elements) {
                updatedFilterForm.elements[key].value = updatedFilterForm.elements[formElement].value;
            }
        }
        
        this.setState({ filterForm: updatedFilterForm });
    }


    render() {
        return(
            <div className={ classes.Sidebar }>
                <div className={ classes.Title }>Количество пересадок</div>
                <FilterForm
                    filterForm={ this.state.filterForm }
                    filterCheckboxClicked={ this.filterCheckboxHandler } />
            </div>
        );
    }
}

export default Sidebar;