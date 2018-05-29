import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';
import { openingPlace } from '../../../actions/OpeningEditorActions';

class OpeningList extends React.Component {

    render() {

        let openShapes = [];
        for(let i = 0; i < this.props.fieldShapes.length; ++i) {              
            if(this.props.fieldShapes[i].shape.openconcept) {

                let svg = null;
                for(let k = 0; k < this.props.openingseq.sequence.length; ++k) { 
                    if(this.props.openingseq.sequence[k].id === i) {
                        const view = this.props.openingseq.sequence[k].shape.icon.attrs.viewBox.split(' ');
                        const x = Number(view[0]) + Number(view[2]) / 2;
                        const y = Number(view[1]) + Number(view[3]) / 2;
                        svg = <div onDragStart={e => this.onDragStart(e, this.props.openingseq.sequence[k].shape)} draggable>
                                <svg width={this.props.openingseq.sequence[k].shape.icon.attrs.width} height={this.props.openingseq.sequence[k].shape.icon.attrs.height} viewBox={this.props.openingseq.sequence[k].shape.icon.attrs.viewBox}>
                                    <path fill={this.props.openingseq.sequence[k].shape.icon.childs[0].attrs.fill} d={this.props.openingseq.sequence[k].shape.icon.childs[0].attrs.d} />
                                    <text x={x} y={y} alignmentBaseline="middle" textAnchor="middle">{this.props.openingseq.sequence[k].shape.concept !== undefined ? this.props.openingseq.sequence[k].shape.concept : ''}</text>
                                </svg>
                            </div>;
                    }
                }

                let opencell = <div key={i} className="open-cell" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e, i)}>{svg}</div>;
                openShapes.push(opencell);
            }
        }

        /*const figElements = this.props.figList.map((figure, key) => {
            
            const view = figure.icon.attrs.viewBox.split(' ');
            const x = Number(view[0]) + Number(view[2]) / 2;
            const y = Number(view[1]) + Number(view[3]) / 2;

            return <div className="draggable" key={figure.id} onDragStart={e => this.onDragStart(e, figure)} draggable>
                        <svg width={figure.icon.attrs.width} height={figure.icon.attrs.height} viewBox={figure.icon.attrs.viewBox}>
                            <path fill={figure.icon.childs[0].attrs.fill} d={figure.icon.childs[0].attrs.d} />
                            <text x={x} y={y} alignmentBaseline="middle" textAnchor="middle">{figure.concept !== undefined ? figure.concept : ''}</text>
                        </svg>
                    </div>;
        });*/

        return(
            <div id="open-shapes-ul-flex-container">
                {openShapes}
            </div>
        );
    }

    onDragOver(e) {

        e.preventDefault();
    }

    onDrop(e, id) {

        let fig = e.dataTransfer.getData("figure");
        this.props.actions.onOpenPlace(id, JSON.parse(fig));
    }

    onDragStart(e, shape) {

        e.dataTransfer.setData("figure", JSON.stringify(shape));
    }
}

export default connect(
    state => {
        return {
            openingseq: state.opening,
            fieldShapes: state.openingdragfieldshapes,
        };
    },
    dispatch => {
        return {
            actions: {
                onOpenPlace: (id, fig) => {
                    const action = openingPlace(id, fig);
                    dispatch(action);
                },
            }
        }
    }
)(OpeningList);