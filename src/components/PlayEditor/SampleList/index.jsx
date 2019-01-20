import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';

class SampleList extends React.Component {

    render() {

        const { sample } = this.props;

        if (sample.icon.childs.name === 'path') {
            return(
                <div className="sample-shape-flex-box">
                    <svg width={sample.icon.attrs.width} height={sample.icon.attrs.height} viewBox={sample.icon.attrs.viewBox}>
                        <path fill={sample.icon.childs.attrs.fill} stroke={sample.icon.childs.attrs.stroke} strokeWidth={sample.icon.childs.attrs.strokeWidth} d={sample.icon.childs.attrs.d} />
                    </svg>
                </div>
            );
        } else {
            return(
                <div className="sample-shape-flex-box">
                    <svg width={sample.icon.attrs.width} height={sample.icon.attrs.height} viewBox={sample.icon.attrs.viewBox}>
                        <circle fill={sample.icon.childs.attrs.fill} stroke={sample.icon.childs.attrs.stroke} strokeWidth={sample.icon.childs.attrs.strokeWidth} cx={sample.icon.childs.attrs.cx} cy={sample.icon.childs.attrs.cy} r={sample.icon.childs.attrs.r} />
                    </svg>
                </div>
            );
        }
    }
}

export default SampleList;