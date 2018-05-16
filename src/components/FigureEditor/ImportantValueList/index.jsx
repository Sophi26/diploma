import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';
import ImportantValue from '../ImportantValue';

class ImportantValueList extends React.Component {

    render() {

        const elements = this.props.features.map((feature, key) => {
            return <li key={key}>
                        <ImportantValue feature={feature} />
                    </li>;
        });
    
        return(
            <ul id="important-list">
                {elements}
            </ul>
        );
    }
}

export default ImportantValueList