import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';
import TaskConcept from '../TaskConcept';
import { experimentConcept } from '../../../actions/OpeningEditorActions';

class TaskList extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            selectId: null,
        }
    }

    render() {

        const conceptElements = this.props.conceptList.map((concept, key) => { 
            return <li key={key}>
                        <TaskConcept concept={concept}   
                                isSelectConcept={this.state.selectId === concept.id || (this.props.formingConcept === undefined ? 0 : this.props.formingConcept.id === concept.id)} 
                                onTaskConceptClick={this.selectTaskConcept.bind(this, concept.id, concept)} />
                    </li>;
        });

        return(
            <ul id="task-l">
                {conceptElements}
            </ul>
        );
    }

    selectTaskConcept(selectId, concept) {
        
        this.setState({ selectId });
        this.props.actions.onExperimentConcept(concept);   
    }
}

export default connect(
    state => {
        return {
            conceptList: state.selconcept,
            formingConcept: state.opening.expconcept,
        };
    },
    dispatch => {
        return {
            actions: {
                onExperimentConcept: (concept) => {
                    const action = experimentConcept(concept);
                    dispatch(action);
                },
            }
        }
    }
)(TaskList);