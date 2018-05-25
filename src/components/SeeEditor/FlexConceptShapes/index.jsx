import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';

class FlexConceptShapes extends React.Component {

    render() {

        const figElements = this.props.shapes.shapes.map((figure, key) => { 
            return <div className="conc-shape-flex-block" key={key}>
                        <svg width="100px" height="100px" viewBox={figure.icon.attrs.viewBox}>
                            <path fill={figure.icon.childs[0].attrs.fill} d={figure.icon.childs[0].attrs.d} />
                        </svg>
                    </div>;
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