import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';

class FieldWithShapes extends React.Component {

    render() {

        const table = [];

        for(let i = 0; i < this.props.fieldTab.height; ++i) {
            let columns = [];
            for(let j = 0; j < this.props.fieldTab.width; ++j) {
                const column = <td></td>;
                columns.push(column);
            }
            const row = <tr>{columns}</tr>;
            table.push(row);
        }

        return(
            <table id="f-s-tab">
                {table}
            </table>
        );
    }
}

export default connect(
    state => {
        return {
            fieldTab: state.field,
        };
    },
    dispatch => {
        return {
            actions: {
                
            }
        }
    }
)(FieldWithShapes);