import React, { Component } from 'react';

import FilterForm from '../../components/FilterForm/FilterForm';

import classes from './Main.module.css';

class Main extends Component {
    state = {
        filterForm: {
            formType: 'BUTTON_FILTER',
            elements: {
                cheapest: {
                    value: false,
                    position: 'Left',
                    text: 'Самый дешевый'
                },
                fastest: {
                    type: false,
                    position: 'Right',
                    text: 'Самый быстрый'
                }
            },
            activeElement: null
        }
    }

    filterButtonHandler = (formElement) => {
        const { filterForm } = this.state;
        let updatedFilterForm = null;

        if (filterForm.activeElement !== formElement) {
            if (filterForm.activeElement) {
                updatedFilterForm = {
                    ...filterForm,
                    elements: {
                        ...filterForm.elements,
                        [filterForm.activeElement]: {
                            ...filterForm.elements[filterForm.activeElement],
                            value: !filterForm.elements[filterForm.activeElement].value
                        },
                        [formElement]: {
                            ...filterForm.elements[formElement],
                            value: !filterForm.elements[formElement].value
                        }
                    },
                    activeElement: formElement
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
                    },
                    activeElement: formElement
                }
            }
        // } else {
        //     updatedFilterForm = {
        //         ...filterForm,
        //         elements: {
        //             ...filterForm.elements,
        //             [formElement]: {
        //                 ...filterForm.elements[formElement],
        //                 value: !filterForm.elements[formElement].value
        //             }
        //         },
        //         activeElement: null
        //     }
        this.setState({ filterForm: updatedFilterForm });
        }
    }

    render() {
        return(
            <div className={ classes.Main }>
                <FilterForm
                    filterForm={ this.state.filterForm }
                    filterButtonClicked={ this.filterButtonHandler } />
            </div>
        );
    }
}

export default Main;