import React, { Component } from 'react';

import Layout from '../../hoc/Layout/Layout'
import Sidebar from '../../components/Sidebar/Sidebar';
import FilterForm from '../../components/FilterForm/FilterForm';
import TicketList from '../../components/TicketList/TicketList';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import classes from './Main.module.css';

class Main extends Component {
    state = {
        buttonFilterForm: {
            formType: 'BUTTON_FILTER',
            elements: {
                cheapest: {
                    value: false,
                    position: 'Left',
                    text: 'Самый дешевый',
                    filter: () => this.cheapestFilter()
                },
                fastest: {
                    type: false,
                    position: 'Right',
                    text: 'Самый быстрый',
                    filter: () => this.fastestFilter()
                }
            },
            activeElement: null
        },
        checkboxFilterForm: {
            formType: 'CHECKBOX_FILTER',
            elements: {
                all: {
                    transfers: 'all',
                    text: 'Все',
                    value: true
                },
                zero: {
                    transfers: 0,
                    text: 'Без пересадок',
                    value: true
                },
                one: {
                    transfers: 1,
                    text: '1 пересадка',
                    value: true
                },
                two: {
                    transfers: 2,
                    text: '2 пересадки',
                    value: true
                },
                three: {
                    transfers: 3,
                    text: '3 пересадки',
                    value: true
                }
            }
        },
        searchId: null,
        loading: true,
        tickets: []
    }

    componentDidMount() {
        axios.get('search')
            .then(result => {
                axios.get(`tickets?searchId=${ result.data.searchId }`)
                    .then(searchResult => {
                        this.setState({ tickets: searchResult.data.tickets, loading: false });
                    })
                    .catch(error => {
                        this.setState({ loading: false });
                    });
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    cheapestFilter = () => {
        if (this.state.tickets !== []) {

            let filteredTickets = [];
            filteredTickets = this.state.tickets.sort((a, b) => {
                return a.price - b.price;
            });

            return filteredTickets;
        }
    }

    fastestFilter = () => {
        if (this.state.tickets !== []) {
            let filteredTickets = [];

            filteredTickets = this.state.tickets.sort((a, b) => {
                let ta = 0; 
                let tb = 0;

                a.segments.forEach(segment => {
                    ta += segment.duration;
                });

                b.segments.forEach(segment => {
                    tb += segment.duration;
                });

                return ta - tb;
            });

            return filteredTickets;
        }
    }

    checkboxFiltration = () => {
        const { checkboxFilterForm } = this.state;
        let checkboxArray = [];

        for (let key in checkboxFilterForm.elements) {
            if (checkboxFilterForm.elements[key].value) {
                checkboxArray.push(checkboxFilterForm.elements[key].transfers);
            }
        }

        return checkboxArray;
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

            this.setState({ buttonFilterForm: updatedFilterForm, tickets: buttonFilterForm.elements[formElement].filter() });
        }
    }

    filterCheckboxHandler = (formElement) => {
        const { checkboxFilterForm } = this.state;
        let updatedFilterForm = null;

        if (formElement !== 'all') {
            updatedFilterForm = {
                ...checkboxFilterForm,
                elements: {
                    ...checkboxFilterForm.elements,
                    [formElement]: {
                        ...checkboxFilterForm.elements[formElement],
                        value: !checkboxFilterForm.elements[formElement].value
                    },
                    all: {
                        ...checkboxFilterForm.elements.all,
                        value: false
                    }
                }
            }

            let counter = Object.keys(updatedFilterForm.elements).length - 1;

            for (let key in updatedFilterForm.elements) {
                if (key !== 'all' && updatedFilterForm.elements[key].value === true) {
                    counter -= 1;
                }
            }

            if (counter === 0) {
                updatedFilterForm.elements.all.value = true;
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
        const { checkboxFilterForm, buttonFilterForm, tickets } = this.state;
        const checkboxArray = this.checkboxFiltration();

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
                        filter={ checkboxArray }
                        data={ tickets } />
                </Layout>
            </div>
        );
    }
}

export default withErrorHandler(Main, axios);