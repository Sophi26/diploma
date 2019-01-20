import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';

class OkList extends React.Component {

    render() {

        let userShapes = [];
        for(let i = 0; i < this.props.userUl.length; ++i) {              

            let svg = null;
            if (this.props.userUl[i].icon.childs.name === 'path') {
                svg = <div className="user-shape">
                        <svg width={this.props.userUl[i].icon.attrs.width} height={this.props.userUl[i].icon.attrs.height} viewBox={this.props.userUl[i].icon.attrs.viewBox}>
                            <path fill={this.props.userUl[i].icon.childs.attrs.fill} stroke={this.props.userUl[i].icon.childs.attrs.stroke} strokeWidth={this.props.userUl[i].icon.childs.attrs.strokeWidth} d={this.props.userUl[i].icon.childs.attrs.d} />
                        </svg>
                    </div>;
            } else {
                svg = <div className="user-shape">
                        <svg width={this.props.userUl[i].icon.attrs.width} height={this.props.userUl[i].icon.attrs.height} viewBox={this.props.userUl[i].icon.attrs.viewBox}>
                            <circle fill={this.props.userUl[i].icon.childs.attrs.fill} stroke={this.props.userUl[i].icon.childs.attrs.stroke} strokeWidth={this.props.userUl[i].icon.childs.attrs.strokeWidth} cx={this.props.userUl[i].icon.childs.attrs.cx} cy={this.props.userUl[i].icon.childs.attrs.cy} r={this.props.userUl[i].icon.childs.attrs.r} />
                        </svg>
                    </div>;
            }
            userShapes.push(svg);
        }

        return(
            <div id="samp-shapes-flex-block">
                {userShapes}
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            userUl: state.userlist,
        };
    },
    dispatch => {
        return {
            actions: {
                
            }
        }
    }
)(OkList);