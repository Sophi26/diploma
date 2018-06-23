import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';
import { actionFigure } from '../../../actions/PlayEditorActions';

class ActionBlock extends React.Component {

    render() {
        
        console.log("RENDER!!!");
        let svgf = null;
        if(this.props.shape.shape !== undefined) {
            svgf = <svg transform={this.props.shape.transform} width={this.props.shape.shape.icon.attrs.width} height={this.props.shape.shape.icon.attrs.height} viewBox={this.props.shape.shape.icon.attrs.viewBox}>
                        <path fill={this.props.shape.shape.icon.childs[0].attrs.fill} d={this.props.shape.shape.icon.childs[0].attrs.d} />
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
    }
}

export default connect(
    state => {
        return {
            shape: state.actionfig,
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