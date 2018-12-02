import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';
import { actionFigure } from '../../../actions/PlayEditorActions';

class ActionBlock extends React.Component {

    render() {
        
        let svgf = null;
        if(this.props.shape.shape !== undefined) {
            svgf = <svg transform={this.props.shape.transform} width={this.props.shape.shape.icon.attrs.width} height={this.props.shape.shape.icon.attrs.height} viewBox={this.props.shape.shape.icon.attrs.viewBox}>
                        <path fill={this.props.shape.shape.icon.childs.attrs.fill} d={this.props.shape.shape.icon.childs.attrs.d} />
                    </svg>;
        }

        return(
            <div id="action-f" onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e)}>
                {svgf}
            </div>
        );
    }

    onDragOver(e) {

        e.preventDefault();
    }

    onDrop(e) {

        let fig = e.dataTransfer.getData("figure");
        this.props.actions.onActionFigure(JSON.parse(fig));

        fetch("/api/dropfigactionblock", {
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
}

export default connect(
    state => {
        return {
            shape: state.actionfig,
            test_id: state.testid
        };
    },
    dispatch => {
        return {
            actions: {
                onActionFigure: (fig) => {
                    const action = actionFigure(fig);
                    dispatch(action);
                },
            }
        }
    }
)(ActionBlock);