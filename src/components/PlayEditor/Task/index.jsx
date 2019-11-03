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
                <p id="task-text-p">
                    Перед вами расставлены игрушки детей одного из чужих народов. Некоторые игрушки на языке этого народа называются «<p className="task-concept">{task}</p>», как, например, фигурка-образец, другие носят иное название. Здесь на поле есть еще игрушки, которые называются «<p className="task-concept">{task}</p>». Ваша задача — выставить в поле «Выбранные» все игрушки, которые имеют то же название «<p className="task-concept">{task}</p>», что и фигурка-образец.
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