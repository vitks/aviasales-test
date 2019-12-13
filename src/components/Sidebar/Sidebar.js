import React from 'react';

import FilterForm from '../FilterForm/FilterForm';

import classes from './Sidebar.module.css';

const sidebar = (props) => (
    <div className={ classes.Sidebar }>
        <div className={ classes.Title }>Количество пересадок</div>
        <FilterForm
            filterForm={ props.filterForm }
            filterCheckboxClicked={ props.filterCheckboxHandler } />
    </div>
);

export default sidebar;