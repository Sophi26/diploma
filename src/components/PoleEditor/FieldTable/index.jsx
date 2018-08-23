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
                
                let svg = null;
                for(let k = 0; k < this.props.shapes.length; ++k) { 
                    if(Number(this.props.shapes[k].x) === i && Number(this.props.shapes[k].y) === j) {
                        const view = this.props.shapes[k].shape.icon.attrs.viewBox.split(' ');
                        const x = Number(view[0]) + Number(view[2]) / 2;
                        const y = Number(view[1]) + Number(view[3]) / 2;
                        svg = <div className="draggable-table" onDragStart={e => this.onDragStart(e, this.props.shapes[k].shape)} draggable>
                                <svg width={this.props.shapes[k].shape.icon.attrs.width} height={this.props.shapes[k].shape.icon.attrs.height} viewBox={this.props.shapes[k].shape.icon.attrs.viewBox}>
                                    <path fill={this.props.shapes[k].shape.icon.childs.attrs.fill} d={this.props.shapes[k].shape.icon.childs.attrs.d} />
                                    <text x={x} y={y} alignmentBaseline="middle" textAnchor="middle">{this.props.shapes[k].shape.concept !== undefined ? this.props.shapes[k].shape.concept : ''}</text>
                                </svg>
                            </div>;
                        break;
                    }
                }

                const column = <td key={j} className="droppable" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e, i, j)}>{svg}</td>;
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

    onDrop(e, x, y) {

        let fig = e.dataTransfer.getData("figure");
        this.props.actions.onShapePlace(x, y, JSON.parse(fig));
    }

    onDragStart(e, shape) {

        e.dataTransfer.setData("figure", JSON.stringify(shape));
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
                onShapePlace: (x, y, fig) => {
                    const action = shapePlace(x, y, fig);
                    dispatch(action);
                },
            }
        }
    }
)(FieldTable);