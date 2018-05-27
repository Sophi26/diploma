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
            return <div className="shape-li-flex-block" key={key}>
                        <svg width={figure.icon.attrs.width} height={figure.icon.attrs.height} viewBox={figure.icon.attrs.viewBox}>
                            <path fill={figure.icon.childs[0].attrs.fill} d={figure.icon.childs[0].attrs.d} />
                            <text x={x} y={y} alignmentBaseline="middle" textAnchor="middle">{figure.concept !== undefined ? figure.concept : ''}</text>
                        </svg>
                    </div>;
        });

        return(
            <div id="all-shapes-ul-flex-container">
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
)(ShapeList);