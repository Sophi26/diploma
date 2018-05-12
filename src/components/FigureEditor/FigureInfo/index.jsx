import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';

class FigureInfo extends React.Component {

    render() {
    
        return(
            <div id="fig-info">
                <h2>{this.props.figInfo.figurename}</h2>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            figInfo: state.figureinfo,
        };
    },
    dispatch => {
        return {
            actions: {

            }
        }
    }
)(FigureInfo);