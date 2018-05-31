import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';

class SampleList extends React.Component {

    render() {

        const { sample } = this.props;

        return(
            <div className="sample-shape-flex-box">
                <svg width={sample.icon.attrs.width} height={sample.icon.attrs.height} viewBox={sample.icon.attrs.viewBox}>
                    <path fill={sample.icon.childs[0].attrs.fill} d={sample.icon.childs[0].attrs.d} />
                </svg>
            </div>
        );
    }
}

export default SampleList;