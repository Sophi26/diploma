import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';

class OpeningList extends React.Component {

    render() {

        let openShapes = [];
        console.log(this.props.fieldShapes);
        console.log(this.props.opening);
        if(this.props.opening.expconcept !== undefined) {
            for(let i = 0; i < this.props.fieldShapes.length; ++i) {               
                if(this.props.fieldShapes[i].shape.concept === this.props.opening.expconcept.conceptname[0]) {
                    const opencell = <div className="open-cell"></div>;
                    openShapes.push(opencell);
                }
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

    /*onDragStart(e, shape) {

        e.dataTransfer.setData("figure", JSON.stringify(shape));
    }*/
}

export default connect(
    state => {
        return {
            opening: state.opening,
            fieldShapes: state.openingdragfieldshapes,
        };
    },
    dispatch => {
        return {
            actions: {
                
            }
        }
    }
)(OpeningList);