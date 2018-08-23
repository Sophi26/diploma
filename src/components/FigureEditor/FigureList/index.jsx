import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';
import Figure from '../Figure';
import { deleteFigure } from '../../../actions/FigureEditorActions';
import { renameFigure } from '../../../actions/FigureEditorActions';
import { openFigure } from '../../../actions/FigureEditorActions';
import { selectFeature } from '../../../actions/FigureEditorActions';
import { deselectFeature } from '../../../actions/FigureEditorActions';

class FigureList extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            openFigureId: null,
        }
    }

    render() {

        const figureElements = this.props.figureList.map((figure, key) => { 
            return <li key={key}>
                        <Figure figure={figure}  
                                actions={this.props.actions} 
                                isOpenFigure={this.state.openFigureId === figure.id} 
                                onFigureClick={this.openFig.bind(this, figure.id)} />
                    </li>;
        });
    
        return(
            <ul id="figure-list">
                {figureElements}
            </ul>
        );
    }

    openFig(openFigureId) {
        
        this.setState({ openFigureId });
        for(let i = 0; i < this.props.figureList.length; ++i) {
            if(this.props.figureList[i].id === openFigureId) {
                let impfeatlist = [];
                this.props.figureList[i].features.forEach(feature => {
                    const check_important = typeof(feature.important) == "boolean" ? feature.important : feature.important == "true" ? true : false;
                    if(check_important)
                        impfeatlist.push({ id: feature.id, name: feature.featurename, values: feature.valuename, selvalue: feature.valuename[0] });
                });
                this.props.actions.onOpenFigure(openFigureId, this.props.figureList[i].figurename, this.props.figureList[i].icon, impfeatlist);
                break;
            }
        }
    }
}

export default connect(
    state => {
        return {
            figureList: state.figures,
        };
    },
    dispatch => {
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
                onOpenFigure: (id, name, img, impfeatures) => {
                    const action = openFigure(id, name, img, impfeatures);
                    dispatch(action);
                },
                onSelectFeature: (id, fid, fname, fvalues) => {
                    const action = selectFeature(id, fid, fname, fvalues);
                    dispatch(action);
                },
                onDeselectFeature: (id, fid) => {
                    const action = deselectFeature(id, fid);
                    dispatch(action);
                },
            }
        }
    }
)(FigureList);