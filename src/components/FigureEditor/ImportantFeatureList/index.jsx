import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';
import ImportantFeature from '../ImportantFeature';

class ImportantFeatureList extends React.Component {

    render() {

        const featureElements = this.props.features.map((feature, key) => {
            return <li key={feature.id[0]}>
                        <ImportantFeature figId={this.props.figId} feature={feature} actions={this.props.actions} />
                    </li>;
        });
    
        return(
            <ul id="important-feature-list">
                {featureElements}
            </ul>
        );
    }
}

export default ImportantFeatureList