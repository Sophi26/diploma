import React from 'react';
import { render } from 'react-dom';
import classNames from 'classnames';

import './style.css';

class ImportantValue extends React.Component {

    render() {     

        console.log(this.props.feature);
        return (
            <div className="imp-feature-item">
                <p>{this.props.feature === undefined ? "" : this.props.feature.name}</p>
            </div>
        );
    }

}

export default ImportantValue