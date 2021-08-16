import React, { Component } from 'react';
import PmsSideNav from '../layouts/PmsSideNav';
import PmstopNav from '../layouts/PmstopNav';
import Quickbar from '../layouts/Quickbar';
import Content from '../sections/Basictable/PmsprojecttaskdetailsTable';

class Pmsprojecttaskdetails extends Component {
    render() {
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <PmsSideNav data={this.props}/>
                <main className="body-content">
                    <Content data={this.props}/>
                </main>
                <Quickbar />
            </div>
        );
    }
}

export default Pmsprojecttaskdetails;
