import React, { Component } from 'react';
import PmsSideNav from '../layouts/PmsSideNav';
import PmstopNav from '../layouts/PmstopNav';
import Quickbar from '../layouts/Quickbar';
import Content from '../sections/Basictable/PmsprojectviewTable';

class Pmsprojectview extends Component {
    render() {
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <main className="pr-5">
                    <PmstopNav data={this.props} />
                    <Content/>
                </main>
                <Quickbar />
            </div>
        );
    }
}

export default Pmsprojectview;
