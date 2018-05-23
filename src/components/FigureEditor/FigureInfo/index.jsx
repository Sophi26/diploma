import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';
import ImportantValueList from '../ImportantValueList';
import ConceptList from '../ConceptList'

class FigureInfo extends React.Component {

    render() {
            
        const concept = <div id="concept-list">
                            <p>Дать название</p>
                            <ConceptList features={this.props.figInfo.impfeatures} />
                        </div>;

        return(
            <div id="fig-info">
                <h2>{this.props.figInfo.figurename}</h2>
                <ImportantValueList features={this.props.figInfo.impfeatures} />
                {this.props.figInfo.impfeatures[0] !== undefined ? concept : null}
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