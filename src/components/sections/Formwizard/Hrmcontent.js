import React, { Component } from 'react';
import Breadcrumb from './Breadcrumb';
// import Stepone from './style1/Steps';
// import Steptwo from './style2/Steps';
// import Stepthree from './style3/Steps';
import Stepfour from './style5/Steps';



class Hrmcontent extends Component {

    render() {
        return (
            <div className="ms-content-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <Breadcrumb />
                    </div>
                    <div className="col-md-12">
                        <div className="ms-panel">
                            <div className="ms-panel-header">
                                <h6>Contacts</h6>
                            </div>
                            <div className="ms-panel-body">
                                <Stepfour />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Hrmcontent;