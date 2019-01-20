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
                    Перед вами ниже расставлены фигуры. Некоторые из них носят название <p className="task-concept">{task}</p>, как фигура-образец, находящаяся в поле в нижней части экрана. Ваша задача — найти все фигуры, имеющие такое название, и выставить их рядом с образцом.
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