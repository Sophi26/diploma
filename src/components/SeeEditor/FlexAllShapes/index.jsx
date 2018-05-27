import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';

class FlexAllShapes extends React.Component {

    render() {

        const figElements = this.props.figList.map((figure, key) => { 
            return <div className="shape-flex-block" key={key}>
                        <svg width={figure.icon.attrs.width} height={figure.icon.attrs.height} viewBox={figure.icon.attrs.viewBox}>
                            <path fill={figure.icon.childs[0].attrs.fill} d={figure.icon.childs[0].attrs.d} />
                        </svg>
                    </div>;
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