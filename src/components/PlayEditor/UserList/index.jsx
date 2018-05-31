import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';

class UserList extends React.Component {

    render() {

        let userShapes = [];
        for(let i = 0; i < this.props.shapes.length; ++i) {              

            const svg = <div className="user-shape">
                            <svg width={this.props.shapes[i].icon.attrs.width} height={this.props.shapes[i].icon.attrs.height} viewBox={this.props.shapes[i].icon.attrs.viewBox}>
                                <path fill={this.props.shapes[i].icon.childs[0].attrs.fill} d={this.props.shapes[i].icon.childs[0].attrs.d} />
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

export default UserList;