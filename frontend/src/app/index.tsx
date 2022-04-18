import React from 'react';
import {css, Global, ThemeProvider} from '@emotion/react';

import Topbar from "./topbar";
import Head from "next/head";

const defaultTheme = {
    isDarkTheme: false,
    primary: '#2563eb',
    primaryTextColor: 'white',
    secondary: '#2563eb',
    secondaryTextColor: '#EEE',
    color: '#333',
    background: '#FFF',
    backgroundDark: '#f3f2f2',
    fontFamily: '"Inter", sans-serif',
};

const AppView = ({ children, meta }) => {

    return (
        <ThemeProvider theme={defaultTheme}>
            <Head>
                <title>{meta?.title || 'WQI App'}</title>
            </Head>
           <Topbar />
            {children}
        </ThemeProvider>
    )

};

export default AppView;