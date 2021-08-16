import React, { Component } from 'react';
import PmsSideNav from '../layouts/PmsSideNav';
import PmstopNav from '../layouts/PmstopNav';
import Quickbar from '../layouts/Quickbar';
import Projectcontent from "../sections/Formelements/Projectcontent";

class Pmsprojectcreate extends Component {
    render() {
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <PmsSideNav data={this.props} />
                <main className="body-content">
                    <PmstopNav data={this.props} />
                    <Projectcontent/>
                </main>
                <Quickbar />
            </div>
        );
    }
}

export default Pmsprojectcreate;
