import React, { Component } from 'react';
import PmsSideNav from '../layouts/PmsSideNav';
import PmstopNav from '../layouts/PmstopNav';
import Quickbar from '../layouts/Quickbar';
import Content from '../sections/Formelements/Content';

class Formelements extends Component {
    render() {
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <PmsSideNav />
                <main className="body-content">
                    <PmstopNav />
                    <Content/>
                </main>
                <Quickbar />
            </div>
        );
    }
}

export default Formelements;
