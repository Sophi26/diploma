import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';

class Task extends React.Component {

    render() {

        const task = this.props.openingseq.expconcept === undefined ? '' : this.props.openingseq.expconcept.conceptname;

        return(
            <div id="task-text">
                <p>
                    Найти и выставить все фигуры, имеющие название <p id="task-concept">{task}</p>
                </p>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            openingseq: state.opening,
        };
    },
    dispatch => {
        return {
            actions: {

            }
        }
    }
)(Task);