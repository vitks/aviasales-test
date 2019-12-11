import React, { Component } from 'react';

import classes from './Sidebar.module.css';

class Sidebar extends Component {
    render() {
        return(
            <div className={ classes.Sidebar }>
                <span>Количество пересадок</span>
            </div>
        );
    }
}

export default Sidebar;