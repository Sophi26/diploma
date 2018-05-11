import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';
import Value from '../Value';
import { deleteValue } from '../../../actions/FeatureEditorActions';
import { renameValue } from '../../../actions/FeatureEditorActions';

class ValueList extends React.Component {

    render() {

        const valueElements = this.props.valueList.valuename.map((value, key) => {
            return <li key={key}>
                        <Value value={value} actions={this.props.actions} featureId={this.props.valueList.id[0]} />
                    </li>;
        });
    
        return(
            <ul id="value-list">
                {valueElements}
            </ul>
        );
    }
}

export default connect(
    state => {
        return {
            valueList: state.values,
        };
    },
    dispatch => {
        return {
            actions: {
                onDeleteValue: (featureid, name) => {
                    const action = deleteValue(featureid, name);
                    dispatch(action);
                },
                onRenameValue: (featureid, prevname, newname) => {
                    const action = renameValue(featureid, prevname, newname);
                    dispatch(action);
                },
            }
        }
    }
)(ValueList);