import React from 'react';
import Topbar from "./topbar";

const AppView = ({ children }) => {

    return (
        <div>
           <Topbar />
            {children}
        </div>
    )

};

export default AppView;