import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';
import { returnUser } from '../../../actions/PlayEditorActions';

class Grid extends React.Component {

    render() {

        const table = [];

        for(let i = 0; i < this.props.fieldTab.height; ++i) {
            let columns = [];
            for(let j = 0; j < this.props.fieldTab.width; ++j) {
                
                let svg = null;
                for(let k = 0; k < this.props.shapes.length; ++k) { 
                    if(Number(this.props.shapes[k].x) === i && Number(this.props.shapes[k].y) === j) {
                        svg = <div style={{display: this.props.shapes[k].shape.hidden ? 'none' : 'block'}} className="draggable-play" onDragStart={e => this.onDragStart(e, this.props.shapes[k].shape)} draggable>
                                <svg width={this.props.shapes[k].shape.icon.attrs.width} height={this.props.shapes[k].shape.icon.attrs.height} viewBox={this.props.shapes[k].shape.icon.attrs.viewBox}>
                                    <path fill={this.props.shapes[k].shape.icon.childs.attrs.fill} d={this.props.shapes[k].shape.icon.childs.attrs.d} />
                                </svg>
                            </div>;
                        break;
                    }
                }

                const column = <td key={j} className="droppable" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e)}>{svg}</td>;
                columns.push(column);
            }
            const row = <tr key={i}>{columns}</tr>;
            table.push(row);
        }

        return(
            <table id="play-tab">
                {table}
            </table>
        );
    }

    onDragStart(e, shape) {

        e.dataTransfer.setData("figure", JSON.stringify(shape));
    }

    onDragOver(e) {

        e.preventDefault();
    }

    onDrop(e) {

        let fig = e.dataTransfer.getData("figure");
        this.props.actions.onReturnUser(JSON.parse(fig));
    }
}

export default connect(
    state => {
        return {
            fieldTab: state.field,
            shapes: state.playfieldshapes,
        };
    },
    dispatch => {
        return {
            actions: {
                onReturnUser: (fig) => {
                    const action = returnUser(fig);
                    dispatch(action);
                },
            }
        }
    }
)(Grid);