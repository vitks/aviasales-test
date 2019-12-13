import React from 'react';

import classes from './Segment.module.css';

const segment = (props) => {
    const { duration, date, origin, destination, stops } = props.data;

    const addZero = (minutes) => {
        return minutes < 10 ? '0' + minutes : minutes;
    }
    
    const departureDate =  new Date(date);
    const arrivalDate = new Date(new Date(date).setMinutes(new Date(date).getMinutes() + duration));
    const flightPeriod = `${ addZero(departureDate.getHours()) }:${ addZero(departureDate.getMinutes()) }
           - ${ addZero(arrivalDate.getHours()) }:${ addZero(arrivalDate.getMinutes()) }`;

    const days = Math.floor(duration / 1440);
    const hours = Math.floor((duration - (days * 1440)) / 60);
    const minutes = Math.floor(duration - (days * 1440) - (hours * 60));
    const timePeriod = `${ days ? days + 'д ' : ''}${ hours ? hours + 'ч ' : ''}${ minutes ? minutes + 'м' : ''}`;

    let titleArray = [`${ origin } - ${ destination }`, 'В пути', 'Пересадок нет'];
    const stopsNumber = stops.length;

    if (stopsNumber === 1) {
        titleArray[2] = stopsNumber + ' пересадка';
    } else if (stopsNumber > 1) {
        titleArray[2] = stopsNumber + ' пересадки';
    }

    return(
        <div className={ classes.Segment }>
            <div className={ classes.Block }>
                <span className={ classes.Title }>{ titleArray[0] }</span>
                <span className={ classes.Content }>{ flightPeriod }</span>
            </div>
            <div className={ classes.Block }>
                <span className={ classes.Title }>{ titleArray[1] }</span>
                <span className={ classes.Content }>{ timePeriod }</span>
            </div>
            <div className={ classes.Block }>
                <span className={ classes.Title }>{ titleArray[2] }</span>
                <span className={ classes.Content }>{ stops.join(', ') }</span>
            </div>
        </div>
    );
}

export default segment;