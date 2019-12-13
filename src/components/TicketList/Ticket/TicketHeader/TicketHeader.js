import React from 'react';

import classes from './TicketHeader.module.css';

const ticketHeader = (props) => {
    const carrier = `//pics.avs.io/99/36/${ props.carrier }.png`;
    const price = `${ props.price } Р`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

    return(
        <div className={ classes.TicketHeader }>
        <span className={ classes.Price }>{ price }</span>
        <img className={ classes.Logo } src={ carrier } alt='Carrier' />
    </div>
    );
}

export default ticketHeader;