import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';
import Value from '../Value';
import { deleteValue } from '../../../actions/FeatureEditorActions';
import { renameValue } from '../../../actions/FeatureEditorActions';

class ValueList extends React.Component {

    render() {

        console.log("VALUELIST:");
        console.log(this.props.valueList);
        const valueElements = this.props.valueList.valuename.map((value, key) => {
            return <li key={key} actions={this.props.actions} featureId={this.props.valueList.id[0]}><Value value={value} /></li>;
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
                onDeleteValue: (name) => {
                    const action = deleteValue(name);
                    dispatch(action);
                },
                onRenameValue: (prevname, newname) => {
                    const action = renameValue(prevname, newname);
                    dispatch(action);
                },
            }
        }
    }
)(ValueList);