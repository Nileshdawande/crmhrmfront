import React, { Component } from 'react';
import Sidenavigation from '../layouts/Sidenavigation';
import Topnavigation from '../layouts/Topnavigation';
import Quickbar from '../layouts/Quickbar';
import Content from '../sections/Formelements/Leadfollowupcontent';

class Leadfollowup extends Component {
    render() {
        return (
            <div className="ms-body ms-aside-left-open ms-primary-theme ms-has-quickbar">
                <Sidenavigation />
                <main className="body-content">
                    <Topnavigation />
                    <Content data={this.props} />
                </main>
                <Quickbar />
            </div>
        );
    }
}

export default Leadfollowup;
