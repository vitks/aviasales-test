import React, { Component } from 'react';

import ButtonFilter from '../../components/Filters/ButtonFilter/ButtonFilter';

import classes from './Main.module.css';

class Main extends Component {
    state = {
        elements: {
            cheapest: {
                type: 'Active',
                position: 'Left',
                text: 'Самый дешевый'
            },
            fastest: {
                type: 'Inactive',
                position: 'Right',
                text: 'Самый быстрый'
            }
        },
        activeElement: 'cheapest'
    }

    filterButtonHandler = ( formElement ) => {
        if (this.state.activeElement !== formElement) {
            let updatedElements = {
                ...this.state.elements,
                [this.state.activeElement]: {
                    ...this.state.elements[this.state.activeElement],
                    type: 'Inactive'
                },
                [formElement]: {
                    ...this.state.elements[formElement],
                    type: 'Active'
                }
            }

            this.setState({ elements: updatedElements, activeElement: formElement });
        }
    }

    render() {
        return(
            <div className={ classes.Main }>
                <ButtonFilter
                    filterForm={ this.state.elements }
                    filterButtonClicked={ this.filterButtonHandler } />
            </div>
        );
    }
}

export default Main;