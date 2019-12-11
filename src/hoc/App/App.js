import React from 'react';

import Header from '../../components/Header/Header';
import Main from '../../containers/Main/Main';
import Sidebar from '../../containers/Sidebar/Sidebar'

import classes from './App.module.css';

function app() {
    return (
        <div className={ classes.App }>
            <Header />
            <div className={ classes.Layout }>
                <Sidebar />
                <Main />
            </div>
        </div>
    );
}

export default app;
