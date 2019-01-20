import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';

class FlexConceptShapes extends React.Component {

    render() {

        const figElements = this.props.shapes.shapes.map((figure, key) => {
            if (figure.icon.childs.name === 'path') {
                return <div className="conc-shape-flex-block" key={key}>
                        <svg width={figure.icon.attrs.width} height={figure.icon.attrs.height} viewBox={figure.icon.attrs.viewBox}>
                            <path fill={figure.icon.childs.attrs.fill} stroke={figure.icon.childs.attrs.stroke} strokeWidth={figure.icon.childs.attrs.strokeWidth} d={figure.icon.childs.attrs.d} />
                        </svg>
                    </div>;
            } else {
                return <div className="conc-shape-flex-block" key={key}>
                        <svg width={figure.icon.attrs.width} height={figure.icon.attrs.height} viewBox={figure.icon.attrs.viewBox}>
                            <circle fill={figure.icon.childs.attrs.fill} stroke={figure.icon.childs.attrs.stroke} strokeWidth={figure.icon.childs.attrs.strokeWidth} cx={figure.icon.childs.attrs.cx} cy={figure.icon.childs.attrs.cy} r={figure.icon.childs.attrs.r} />
                        </svg>
                    </div>;
            } 
        });

        return(
            <div id="c-shape">
                <h2>{this.props.shapes.conceptname}</h2>
                <div id="conc-shapes-flex-container">
                    {figElements}
                </div>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            shapes: state.seeconceptshapes,
        };
    },
    dispatch => {
        return {
            actions: {
                
            }
        }
    }
)(FlexConceptShapes);