import React from 'react';

import TicketHeader from './TicketHeader/TicketHeader';
import Segment from './Segment/Segment';

import classes from './Ticket.module.css';

const ticket = (props) => {
    const form = props.data.segments.map(segment => {
        return <Segment data={ segment } />;
    });



    return(
        <div className={ classes.Ticket }>
            <TicketHeader
                price={ props.data.price }
                carrier={ props.data.carrier} />
            { form }
        </div>
    );
}

export default ticket;