import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';

class OkList extends React.Component {

    render() {

        let userShapes = [];
        for(let i = 0; i < this.props.userUl.length; ++i) {              

            const svg = <div className="user-shape">
                            <svg width={this.props.userUl[i].icon.attrs.width} height={this.props.userUl[i].icon.attrs.height} viewBox={this.props.userUl[i].icon.attrs.viewBox}>
                                <path fill={this.props.userUl[i].icon.childs[0].attrs.fill} d={this.props.userUl[i].icon.childs[0].attrs.d} />
                            </svg>
                        </div>;
            userShapes.push(svg);
        }

        return(
            <div id="user-shapes-flex-block">
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