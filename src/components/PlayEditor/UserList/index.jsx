import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';

class UserList extends React.Component {

    render() {

        let userShapes = [];
        for(let i = 0; i < this.props.shapes.length; ++i) {              

            const svg = <div className="user-shape" onDragStart={e => this.onDragStart(e, this.props.shapes[i])} draggable>
                            <svg width={this.props.shapes[i].icon.attrs.width} height={this.props.shapes[i].icon.attrs.height} viewBox={this.props.shapes[i].icon.attrs.viewBox}>
                                <path fill={this.props.shapes[i].icon.childs.attrs.fill} d={this.props.shapes[i].icon.childs.attrs.d} />
                            </svg>
                        </div>;
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

export default UserList;