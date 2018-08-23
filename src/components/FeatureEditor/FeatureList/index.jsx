import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';
import Feature from '../Feature';
import { deleteFeature } from '../../../actions/FeatureEditorActions';
import { renameFeature } from '../../../actions/FeatureEditorActions';
import { showValues } from '../../../actions/FeatureEditorActions';

class FeatureList extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            openFeatureId: this.props.featureList[0].id,
        }
    }

    render() {

        const featureElements = this.props.featureList.map((feature, key) => {
            return <li key={feature.id}>
                        <Feature feature={feature} actions={this.props.actions} isValueShown={this.state.openFeatureId === feature.id} onFeatureNameClick={this.showValues.bind(this, feature.id)} />
                    </li>;
        });
    
        return(
            <ul id="feature-list">
                {featureElements}
            </ul>
        );
    }

    showValues(openFeatureId) {
        
        this.setState({ openFeatureId });
        for(let i = 0; i < this.props.featureList.length; ++i) {
            if(this.props.featureList[i].id === openFeatureId) {
                this.props.actions.onShowValues(openFeatureId, this.props.featureList[i].valuename);
                break;
            }
        }
    }
}

export default connect(
    state => {
        return {
            featureList: state.features,
        };
    },
    dispatch => {
        return {
            actions: {
                onDeleteFeature: (id) => {
                    const action = deleteFeature(id);
                    dispatch(action);
                },
                onRenameFeature: (id, name) => {
                    const action = renameFeature(id, name);
                    dispatch(action);
                },
                onShowValues: (id, values) => {
                    const action = showValues(id, values);
                    dispatch(action);
                },
            }
        }
    }
)(FeatureList);