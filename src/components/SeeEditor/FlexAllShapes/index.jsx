import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';

class FlexAllShapes extends React.Component {

    render() {

        const figElements = this.props.figList.map((figure, key) => {
            if (figure.icon.childs.name === 'path') {
                return <div className="shape-flex-block" key={key}>
                        <svg width={figure.icon.attrs.width} height={figure.icon.attrs.height} viewBox={figure.icon.attrs.viewBox}>
                            <path fill={figure.icon.childs.attrs.fill} stroke={figure.icon.childs.attrs.stroke} strokeWidth={figure.icon.childs.attrs.strokeWidth} d={figure.icon.childs.attrs.d} />
                        </svg>
                    </div>;
            } else {
                return <div className="shape-flex-block" key={key}>
                        <svg width={figure.icon.attrs.width} height={figure.icon.attrs.height} viewBox={figure.icon.attrs.viewBox}>
                            <circle fill={figure.icon.childs.attrs.fill} stroke={figure.icon.childs.attrs.stroke} strokeWidth={figure.icon.childs.attrs.strokeWidth} cx={figure.icon.childs.attrs.cx} cy={figure.icon.childs.attrs.cy} r={figure.icon.childs.attrs.r} />
                        </svg>
                    </div>;
            } 
        });

        return(
            <div id="all-shapes-flex-container">
                {figElements}
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            figList: state.figures,
        };
    },
    dispatch => {
        return {
            actions: {
                
            }
        }
    }
)(FlexAllShapes);