import React from 'react';

import Spinner from '../UI/Spinner/Spinner';
import Ticket from './Ticket/Ticket'

const ticketList = (props) => {
    let form = <Spinner />;

    if (!props.loading) {
        if (props.error !== null) {
            form = <p style={{
                    fontSize: '50px',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                }}>{ props.error.response.data }</p>;
        } else {
            form = props.data.map((ticket, i) => {
                return <Ticket key={ i } data={ ticket }/>;
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