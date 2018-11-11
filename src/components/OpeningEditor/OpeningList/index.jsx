import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

const { remote } = require("electron");
const { dialog } = remote;

import './style.css';
import { openingPlace } from '../../../actions/OpeningEditorActions';

class OpeningList extends React.Component {

    render() {

        let openShapes = [];
        let id_block = -1;
        for(let i = 0; i < this.props.fieldShapes.length; ++i) {              
            if(this.props.fieldShapes[i].shape.openconcept) {

                ++id_block; 
                let svg = null; 
                if(this.props.openingseq.sequence[id_block]) {
                    const view = this.props.openingseq.sequence[id_block].icon.attrs.viewBox.split(' ');
                    const x = Number(view[0]) + Number(view[2]) / 2;
                    const y = Number(view[1]) + Number(view[3]) / 2;
                    const fig = this.props.openingseq.sequence[id_block];
                    svg = <div className="draggeble-item" onDragStart={e => this.onDragStart(e, fig)} draggable>
                            <svg width={this.props.openingseq.sequence[id_block].icon.attrs.width} height={this.props.openingseq.sequence[id_block].icon.attrs.height} viewBox={this.props.openingseq.sequence[id_block].icon.attrs.viewBox}>
                                <path fill={this.props.openingseq.sequence[id_block].icon.childs.attrs.fill} d={this.props.openingseq.sequence[id_block].icon.childs.attrs.d} />
                                <text x={x} y={y} alignmentBaseline="middle" textAnchor="middle">{this.props.openingseq.sequence[id_block].concept !== undefined ? this.props.openingseq.sequence[id_block].concept : ''}</text>
                            </svg>
                        </div>;
                }

                let opencell = <div key={id_block} className="open-cell" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e)}>{svg}</div>;
                openShapes.push(opencell);
            }
        }

        return(
            <div id="open-shapes-ul-flex-container">
                {openShapes}
            </div>
        );
    }

    onDragOver(e) {

        e.preventDefault();
    }

    onDrop(e) {

        let fig = e.dataTransfer.getData("figure");

        if(JSON.parse(fig).concept !== this.props.openingseq.expconcept.conceptname) {
            dialog.showErrorBox("Данная фигура не может быть подкреплением:(", "Выберите, пожалуйста, фигуру, которая имеет название " + this.props.openingseq.expconcept.conceptname + "!");
            return;
        }

        this.props.actions.onOpenPlace(JSON.parse(fig));
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
                onOpenPlace: (fig) => {
                    const action = openingPlace(fig);
                    dispatch(action);
                },
            }
        }
    }
)(OpeningList);