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
                
                let svg = null;
                for(let k = 0; k < this.props.shapes.length; ++k) { 
                    if(this.props.shapes[k].x === i && this.props.shapes[k].y === j) {
                        const view = this.props.shapes[k].shape.icon.attrs.viewBox.split(' ');
                        const x = Number(view[0]) + Number(view[2]) / 2;
                        const y = Number(view[1]) + Number(view[3]) / 2;
                        svg = <div className="draggable-table" onDragStart={e => this.onDragStart(e, this.props.shapes[k].shape)} draggable>
                                <svg width={this.props.shapes[k].shape.icon.attrs.width} height={this.props.shapes[k].shape.icon.attrs.height} viewBox={this.props.shapes[k].shape.icon.attrs.viewBox}>
                                    <path fill={this.props.shapes[k].shape.icon.childs[0].attrs.fill} d={this.props.shapes[k].shape.icon.childs[0].attrs.d} />
                                    <text x={x} y={y} alignmentBaseline="middle" textAnchor="middle">{this.props.shapes[k].shape.concept !== undefined ? this.props.shapes[k].shape.concept : ''}</text>
                                </svg>
                            </div>;
                        break;
                    }
                }

                const column = <td key={j}>{svg}</td>;
                columns.push(column);
            }
            const row = <tr key={i}>{columns}</tr>;
            table.push(row);
        }

        return(
            <table id="f-s-tab">
                {table}
            </table>
        );
    }

    onDragStart(e, shape) {

        e.dataTransfer.setData("figure", JSON.stringify(shape));
    }
}

export default connect(
    state => {
        return {
            fieldTab: state.field,
            shapes: state.openingdragfieldshapes,
        };
    },
    dispatch => {
        return {
            actions: {
                
            }
        }
    }
)(FieldWithShapes);