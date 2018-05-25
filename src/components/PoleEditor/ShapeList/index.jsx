import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';

class ShapeList extends React.Component {

    render() {

        const figElements = this.props.figList.map((figure, key) => { 
            return <div className="shape-li-flex-block" key={key}>
                        <svg width="100px" height="100px" viewBox={figure.icon.attrs.viewBox}>
                            <path fill={figure.icon.childs[0].attrs.fill} d={figure.icon.childs[0].attrs.d} />
                            <text>{figure.concept !== undefined ? figure.concept : ''}</text>
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