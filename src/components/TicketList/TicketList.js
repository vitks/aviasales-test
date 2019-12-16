import React from 'react';

import Spinner from '../UI/Spinner/Spinner';
import Ticket from './Ticket/Ticket';

import classes from './TicketList.module.css';

const ticketList = (props) => {
    let form = <Spinner />;

    if (!props.loading) {
        if (props.error !== null) {
            form = <p className={ classes.Error }>{ props.error.response.data }</p>;
        } else {
            let counter = 0;

            form = props.data.map((ticket, i) => {
                if (counter < 5) {
                    let transferCounter = 0;
                    
                    ticket.segments.forEach(segment => {
                        transferCounter += segment.stops.length;
                    });
                    
                    if ((props.filter.indexOf('all') !== -1) || props.filter.indexOf(transferCounter) !== -1) {
                        counter += 1;
                        return <Ticket key={ i } data={ ticket }/>;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            });
        }
    }
    
    return(
        <div>
            { form }
        </div>
    );
}

export default ticketList;