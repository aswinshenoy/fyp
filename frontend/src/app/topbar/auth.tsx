import React from 'react';
import {Button} from "@traboda/dsr";

const AuthButtons = () => {

    return (
        <div className="auth-buttons">
            <Button link={`/api/admin/`} variant="solid" color="warning" className="mr-2">Sign In</Button>
        </div>
    );

};

export default AuthButtons;