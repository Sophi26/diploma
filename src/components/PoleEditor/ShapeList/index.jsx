import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';

class ShapeList extends React.Component {

    render() {

        const figElements = this.props.figList.map((figure, key) => {

            const view = figure.icon.attrs.viewBox.split(' ');
            const x = Number(view[0]) + Number(view[2]) / 2;
            const y = Number(view[1]) + Number(view[3]) / 2;

            if (figure.icon.childs.name === 'path') {
                return <div className="draggable" key={figure.id} onDragStart={e => this.onDragStart(e, figure)} draggable>
                        <svg width={figure.icon.attrs.width} height={figure.icon.attrs.height} viewBox={figure.icon.attrs.viewBox}>
                            <path fill={figure.icon.childs.attrs.fill} stroke={figure.icon.childs.attrs.stroke} strokeWidth={figure.icon.childs.attrs.strokeWidth} d={figure.icon.childs.attrs.d} />
                            <text x={x} y={y} alignmentBaseline="middle" textAnchor="middle">{figure.concept !== undefined ? figure.concept : ''}</text>
                        </svg>
                    </div>;
            } else {
                return <div className="draggable" key={figure.id} onDragStart={e => this.onDragStart(e, figure)} draggable>
                        <svg width={figure.icon.attrs.width} height={figure.icon.attrs.height} viewBox={figure.icon.attrs.viewBox}>
                            <circle fill={figure.icon.childs.attrs.fill} stroke={figure.icon.childs.attrs.stroke} strokeWidth={figure.icon.childs.attrs.strokeWidth} cx={figure.icon.childs.attrs.cx} cy={figure.icon.childs.attrs.cy} r={figure.icon.childs.attrs.r} />
                            <text x={x} y={y} alignmentBaseline="middle" textAnchor="middle">{figure.concept !== undefined ? figure.concept : ''}</text>
                        </svg>
                    </div>;
            } 
        });

        return(
            <div id="all-shapes-ul-flex-container">
                {figElements}
            </div>
        );
    }

    onDragStart(e, shape) {

        e.dataTransfer.setData("figure", JSON.stringify(shape));
    }
}

export default connect(
    state => {
        return {
            figList: state.dragshapelist,
        };
    },
    dispatch => {
        return {
            actions: {
                
            }
        }
    }
)(ShapeList);