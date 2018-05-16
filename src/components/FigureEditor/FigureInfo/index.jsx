import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';
import ImportantValueList from '../ImportantValueList';

class FigureInfo extends React.Component {

    render() {
    
        return(
            <div id="fig-info">
                <h2>{this.props.figInfo.figurename}</h2>
                <ImportantValueList features={this.props.figInfo.impfeatures} />
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