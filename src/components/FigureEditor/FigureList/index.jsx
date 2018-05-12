import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';
import Figure from '../Figure';
import { deleteFigure } from '../../../actions/FigureEditorActions';
import { renameFigure } from '../../../actions/FigureEditorActions';
import { openFigure } from '../../../actions/FigureEditorActions';
import { selectFeature } from '../../../actions/FigureEditorActions';

class FigureList extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            openFigureId: null/*this.props.figureList[0].id*/,
        }
    }

    render() {

        const figureElements = this.props.figureList.map((figure, key) => {
            return <li key={key} /*onClick={this.openFig.bind(this, figure.id)}*/>
                        <Figure figure={figure} /*actions={this.props.actions}*/ isOpenFigure={this.state.openFigureId === key} />
                    </li>;
        });
    
        return(
            <ul id="figure-list">
                {figureElements}
            </ul>
        );
    }

    /*openFig(openFigureId) {
        
        this.setState({ openFigureId });
        for(let i = 0; i < this.props.figureList.length; ++i) {
            if(this.props.figureList[i].id === openFigureId) {
                this.props.actions.onOpenFigure(openFigureId, this.props.figureList[i].importantfeatures);
                break;
            }
        }
    }*/
}

export default connect(
    state => {
        return {
            featureList: state.features,
            figureList: state.figures,
        };
    },
    /*dispatch => {
        return {
            actions: {
                onDeleteFigure: (id) => {
                    const action = deleteFigure(id);
                    dispatch(action);
                },
                onRenameFigure: (id, name) => {
                    const action = renameFigure(id, name);
                    dispatch(action);
                },
                onOpenFigure: (id, features) => {
                    const action = openFigure(id, features);
                    dispatch(action);
                },
                onSelectFeature: (id, feature) => {
                    const action = selectFeature(id, feature);
                    dispatch(action);
                },
            }
        }
    }*/
)(FigureList);