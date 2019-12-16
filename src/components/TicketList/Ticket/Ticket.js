import React from 'react';

import TicketHeader from './TicketHeader/TicketHeader';
import Segment from './Segment/Segment';

import classes from './Ticket.module.css';

const ticket = (props) => {
    const addZero = (minutes) => {
        return minutes < 10 ? '0' + minutes : minutes;
    }

    const form = props.data.segments.map((segment, i) => {
        const { duration, date, origin, destination, stops } = segment;

        let blockArray = [
            {
                title: `${ origin } - ${ destination }`,
                content: ''
            },
            {
                title: 'В пути',
                content: ''
            },
            {
                title: 'Пересадок нет',
                content: stops.join(', ')
            }
        ];
        
        const departureDate =  new Date(date);
        const arrivalDate = new Date(new Date(date).setMinutes(new Date(date).getMinutes() + duration));
        blockArray[0].content = `${ addZero(departureDate.getHours()) }:${ addZero(departureDate.getMinutes()) }
            - ${ addZero(arrivalDate.getHours()) }:${ addZero(arrivalDate.getMinutes()) }`;

        const days = Math.floor(duration / 1440);
        const hours = Math.floor((duration - (days * 1440)) / 60);
        const minutes = Math.floor(duration - (days * 1440) - (hours * 60));
        blockArray[1].content = `${ days ? days + 'д ' : ''}${ hours ? hours + 'ч ' : ''}${ minutes ? minutes + 'м' : ''}`;

        const stopsNumber = stops.length;

        if (stopsNumber === 1) {
            blockArray[2].title = stopsNumber + ' пересадка';
        } else if (stopsNumber > 1) {
            blockArray[2].title = stopsNumber + ' пересадки';
        }
        
        return <Segment key={ i } blockArray={ blockArray } />;
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