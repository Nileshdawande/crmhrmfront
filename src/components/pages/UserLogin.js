import React, { Component } from 'react';

import Quickbar from '../layouts/Quickbar';
import Content from '../sections/Formelements/UserLoginContent';

class UserLogin extends Component {
    render() {
        return (
            <div className="container-fluid">
                <main className="body-content">
                    <Content/>
                </main>
                <Quickbar />
            </div>
        );
    }
}

export default UserLogin;
