import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';

class FigureImg extends React.Component {

    render() {

        //const icon = this.props.figImg.figureimg === undefined ? null : <svg width={this.props.figImg.figureimg.attrs.width} height={this.props.figImg.figureimg.attrs.height} viewBox={this.props.figImg.figureimg.attrs.viewBox}><path fill={this.props.figImg.figureimg.childs.attrs.fill} d={this.props.figImg.figureimg.childs.attrs.d} /></svg>;
    
        let icon = null;
        if (this.props.figImg.figureimg !== undefined) {
            if (this.props.figImg.figureimg.childs.name === 'path') {
                icon = <svg width={this.props.figImg.figureimg.attrs.width} height={this.props.figImg.figureimg.attrs.height} viewBox={this.props.figImg.figureimg.attrs.viewBox}><path fill={this.props.figImg.figureimg.childs.attrs.fill} stroke={this.props.figImg.figureimg.childs.attrs.stroke} strokeWidth={this.props.figImg.figureimg.childs.attrs.strokeWidth} d={this.props.figImg.figureimg.childs.attrs.d} /></svg>;
            } else {
                icon = <svg width={this.props.figImg.figureimg.attrs.width} height={this.props.figImg.figureimg.attrs.height} viewBox={this.props.figImg.figureimg.attrs.viewBox}><circle fill={this.props.figImg.figureimg.childs.attrs.fill} stroke={this.props.figImg.figureimg.childs.attrs.stroke} strokeWidth={this.props.figImg.figureimg.childs.attrs.strokeWidth} cx={this.props.figImg.figureimg.childs.attrs.cx} cy={this.props.figImg.figureimg.childs.attrs.cy} r={this.props.figImg.figureimg.childs.attrs.r} /></svg>;
            }
        }

        return(
            <div id="figure-fullopen">
                {icon}
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            figImg: state.figureimg,
        };
    },
)(FigureImg);