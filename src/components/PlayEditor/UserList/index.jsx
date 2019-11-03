import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';
import { userSelect } from '../../../actions/PlayEditorActions';

class UserList extends React.Component {

    render() {

        let userShapes = [];
        for(let i = 0; i < this.props.shapes.length; ++i) {              

            let svg = null;
            if (this.props.shapes[i].icon.childs.name === 'path') {
                svg = <div className="user-shape" onDragStart={e => this.onDragStart(e, this.props.shapes[i])} draggable>
                        <svg width={this.props.shapes[i].icon.attrs.width} height={this.props.shapes[i].icon.attrs.height} viewBox={this.props.shapes[i].icon.attrs.viewBox}>
                            <path fill={this.props.shapes[i].icon.childs.attrs.fill} stroke={this.props.shapes[i].icon.childs.attrs.stroke} strokeWidth={this.props.shapes[i].icon.childs.attrs.strokeWidth} d={this.props.shapes[i].icon.childs.attrs.d} />
                        </svg>
                    </div>;
            } else {
                svg = <div className="user-shape" onDragStart={e => this.onDragStart(e, this.props.shapes[i])} draggable>
                        <svg width={this.props.shapes[i].icon.attrs.width} height={this.props.shapes[i].icon.attrs.height} viewBox={this.props.shapes[i].icon.attrs.viewBox}>
                            <circle fill={this.props.shapes[i].icon.childs.attrs.fill} stroke={this.props.shapes[i].icon.childs.attrs.stroke} strokeWidth={this.props.shapes[i].icon.childs.attrs.strokeWidth} cx={this.props.shapes[i].icon.childs.attrs.cx} cy={this.props.shapes[i].icon.childs.attrs.cy} r={this.props.shapes[i].icon.childs.attrs.r} />
                        </svg>
                    </div>;
            }
            userShapes.push(svg);
        }

        return(
            <div id="user-shapes-flex-block" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e)}>
                {userShapes}
            </div>
        );
    }

    onDragOver(e) {

        e.preventDefault();
    }

    onDrop(e) {

        let fig = e.dataTransfer.getData("figure");
        this.props.actions.onUserSelect(JSON.parse(fig));

        fetch("/api/dropfiguserlist", {
            method: "POST",
            body: JSON.stringify({
                exp_name: document.getElementById("exp-name").textContent,
                test_id: this.props.test_id,
                fig_name: JSON.parse(fig).figurename,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {

        })
        .catch();
    }

    onDragStart(e, shape) {

        e.dataTransfer.setData("figure", JSON.stringify(shape));

        fetch("/api/dragfiguserlist", {
            method: "POST",
            body: JSON.stringify({
                exp_name: document.getElementById("exp-name").textContent,
                test_id: this.props.test_id,
                fig_name: shape.figurename,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {

        })
        .catch();
    }
}

// export default UserList;
export default connect(
    state => {
        return {
            shapes: state.userlist,
            test_id: state.testid
        };
    },
    dispatch => {
        return {
            actions: {
                onUserSelect: (fig) => {
                    const action = userSelect(fig);
                    dispatch(action);
                },
            }
        }
    }
)(UserList);