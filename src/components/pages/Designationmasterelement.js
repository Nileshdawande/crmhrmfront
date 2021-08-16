import React, { Component } from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import Quickbar from '../layouts/Quickbar';
import Designationmaster from '../sections/Formelements/Designationmaster';

class Designationmasterelement extends Component {
    render() {
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <Sidenavigation />
                <main className="body-content">
                    <Topnavigation />
                    <Designationmaster/>
                </main>
                <Quickbar />
            </div>
        );
    }
}

export default Designationmasterelement;