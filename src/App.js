import React from 'react';

import Header from './components/Header/Header';
import Main from './containers/Main/Main';

import classes from './App.module.css';

function app() {
    return (
        <div className={ classes.App }>
            <Header />
            <Main />
        </div>
    );
}

export default app;
