import React, { Component } from 'react';
import Content from '../sections/Formelements/UserSignupContent';

class UserSignup extends Component {
    render() {
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <main className="container-fluid bg-light p-5">
                    <Content/>
                </main>
            </div>
        );
    }
}

export default UserSignup;
