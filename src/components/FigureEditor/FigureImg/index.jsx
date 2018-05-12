import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';

class FigureImg extends React.Component {

    render() {

        const icon = this.props.figImg.figureimg === undefined ? null : <svg width={this.props.figImg.figureimg.attrs.width} height={this.props.figImg.figureimg.attrs.height} viewBox={this.props.figImg.figureimg.attrs.viewBox}><path fill={this.props.figImg.figureimg.childs[0].attrs.fill} d={this.props.figImg.figureimg.childs[0].attrs.d} /></svg>;
    
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