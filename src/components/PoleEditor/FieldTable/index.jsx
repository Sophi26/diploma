import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';
import { shapePlace } from '../../../actions/PoleEditorActions';

class FieldTable extends React.Component {

    render() {

        const table = [];

        for(let i = 0; i < this.props.fieldTab.height; ++i) {
            let columns = [];
            for(let j = 0; j < this.props.fieldTab.width; ++j) {
                const column = <td key={j} className="droppable" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e)}></td>;
                columns.push(column);
            }
            const row = <tr key={i}>{columns}</tr>;
            table.push(row);
        }

        return(
            <table id="f-tab">
                {table}
            </table>
        );
    }

    onDragOver(e) {

        e.preventDefault();
    }

    onDrop(e) {

        let fig = e.dataTransfer.getData("figure");
        this.props.actions.onShapePlace(JSON.parse(fig));
    }
}

export default connect(
    state => {
        return {
            fieldTab: state.field,
            shapes: state.dropshapelist,
        };
    },
    dispatch => {
        return {
            actions: {
                onShapePlace: (fig) => {
                    const action = shapePlace(fig);
                    dispatch(action);
                },
            }
        }
    }
)(FieldTable);