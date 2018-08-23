import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';

class HypList extends React.Component {

    render() {

        let userShapes = [];
        for(let i = 0; i < this.props.userUl.length; ++i) {              

            const svg = <div className="user-shape">
                            <svg width={this.props.userUl[i].icon.attrs.width} height={this.props.userUl[i].icon.attrs.height} viewBox={this.props.userUl[i].icon.attrs.viewBox}>
                                <path fill={this.props.userUl[i].icon.childs.attrs.fill} d={this.props.userUl[i].icon.childs.attrs.d} />
                            </svg>
                        </div>;
            userShapes.push(svg);
        }

        const task = this.props.openingseq.expconcept === undefined ? '' : this.props.openingseq.expconcept.conceptname;

        return(
            <div id="hyp-w">
                <div id="hyp-shapes-flex-block">
                    {userShapes}
                </div>
                <p>
                    Какие фигуры носят название <p id="task-concept">{task}</p>?
                </p>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            userUl: state.userlist,
            openingseq: state.opening,
        };
    },
    dispatch => {
        return {
            actions: {
                
            }
        }
    }
)(HypList);