import React, { Component } from 'react';

import Layout from '../../hoc/Layout/Layout'
import Sidebar from '../../components/Sidebar/Sidebar';
import FilterForm from '../../components/FilterForm/FilterForm';
import TicketList from '../../components/TicketList/TicketList';
import axios from '../../axios';

import classes from './Main.module.css';

class Main extends Component {
    state = {
        buttonFilterForm: {
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
        },
        checkboxFilterForm: {
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
        },
        searchId: null,
        loading: true,
        error: null,
        tickets: []
    }

    componentDidMount() {
        axios.get('search')
            .then(result => {
                axios.get(`tickets?searchId=${ result.data.searchId }`)
                    .then(searchResult => {
                        this.setState({ tickets: searchResult.data.tickets.slice(0, 5), loading: false });
                    })
                    .catch(searchError => {
                        this.setState({ error: searchError, loading: false });
                    });
            })
            .catch(error => {
                this.setState({ error: error, loading: false });
            });
    }

    filterButtonHandler = (formElement) => {
        const { buttonFilterForm } = this.state;
        let updatedFilterForm = null;

        if (buttonFilterForm.activeElement !== formElement) {
            if (buttonFilterForm.activeElement) {
                updatedFilterForm = {
                    ...buttonFilterForm,
                    elements: {
                        ...buttonFilterForm.elements,
                        [buttonFilterForm.activeElement]: {
                            ...buttonFilterForm.elements[buttonFilterForm.activeElement],
                            value: !buttonFilterForm.elements[buttonFilterForm.activeElement].value
                        },
                        [formElement]: {
                            ...buttonFilterForm.elements[formElement],
                            value: !buttonFilterForm.elements[formElement].value
                        }
                    },
                    activeElement: formElement
                }
            } else {
                updatedFilterForm = {
                    ...buttonFilterForm,
                    elements: {
                        ...buttonFilterForm.elements,
                        [formElement]: {
                            ...buttonFilterForm.elements[formElement],
                            value: !buttonFilterForm.elements[formElement].value
                        }
                    },
                    activeElement: formElement
                }
            }
            
            this.setState({ buttonFilterForm: updatedFilterForm });
        }
    }

    filterCheckboxHandler = (formElement) => {
        const { checkboxFilterForm } = this.state;
        let updatedFilterForm = null;

        if (formElement !== 'allOptions') {
            updatedFilterForm = {
                ...checkboxFilterForm,
                elements: {
                    ...checkboxFilterForm.elements,
                    [formElement]: {
                        ...checkboxFilterForm.elements[formElement],
                        value: !checkboxFilterForm.elements[formElement].value
                    },
                    allOptions: {
                        ...checkboxFilterForm.elements.allOptions,
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
                ...checkboxFilterForm,
                elements: {
                    ...checkboxFilterForm.elements,
                    [formElement]: {
                        ...checkboxFilterForm.elements[formElement],
                        value: !checkboxFilterForm.elements[formElement].value
                    }
                }
            }
            
            for (let key in updatedFilterForm.elements) {
                updatedFilterForm.elements[key].value = updatedFilterForm.elements[formElement].value;
            }
        }
        
        this.setState({ checkboxFilterForm: updatedFilterForm });
    }

    render() {
        const { checkboxFilterForm, buttonFilterForm, tickets, error } = this.state;

        return(
            <div className={ classes.Main }>
                <Sidebar
                    filterForm={ checkboxFilterForm }
                    filterCheckboxHandler={ this.filterCheckboxHandler } />
                <Layout>
                    <FilterForm
                        filterForm={ buttonFilterForm }
                        filterButtonClicked={ this.filterButtonHandler } />
                    <TicketList
                        error={ error }
                        data={ tickets } />
                </Layout>
            </div>
        );
    }
}

export default Main;