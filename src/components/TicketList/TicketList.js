import React from 'react';

import classes from './TicketList.module.css';

const ticketList = ( props ) => (
    <div classes={ classes.TicketList }>
        <Ticket />
    </div>
);

export default ticketList;