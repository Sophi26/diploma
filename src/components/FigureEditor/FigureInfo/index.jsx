import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import $ from 'jquery';

import './style.css';
import ImportantValueList from '../ImportantValueList';
import ConceptList from '../ConceptList';
import { conceptOptions } from '../../../actions/FigureEditorActions';
import { selectValue } from '../../../actions/FigureEditorActions';
import { selectConcept } from '../../../actions/FigureEditorActions';
import { renameConcept } from '../../../actions/FigureEditorActions';

class FigureInfo extends React.Component {

    render() {

        let concept = null;
        let oneConcept = false;

        if(this.props.figInfo.impfeatures[0] !== undefined) {

            let conceptsArray = [];

            if(this.props.conceptLi[0] !== undefined) {
                this.props.conceptLi.forEach(conceptitem => {
                    if(conceptitem.value.length == this.props.figInfo.impfeatures.length) {
                        let check;
                        for(let i = 0; i < conceptitem.value.length; ++i) {
                            check = 0;
                            for(let j = 0; j < this.props.figInfo.impfeatures.length; ++j) {
                                if(conceptitem.value[i] === this.props.figInfo.impfeatures[j].selvalue) {
                                    ++check;
                                }
                            }
                            if(!check) break;
                        }
                        if(check) {
                            conceptsArray.push(conceptitem);
                            oneConcept = true;
                        }
                    }
                });
            }

            if(conceptsArray[0] === undefined) {

                $.ajax({
                    url: "/api/concepts",
                    type: "GET",
                    async: false,
                    contentType: "application/json",
                    success: (data) => {

                        data.forEach(conceptitem => {
                            if(conceptitem.value.length == this.props.figInfo.impfeatures.length) {
                                let check;
                                for(let i = 0; i < conceptitem.value.length; ++i) {
                                    check = 0;
                                    for(let j = 0; j < this.props.figInfo.impfeatures.length; ++j) {
                                        if(conceptitem.value[i] === this.props.figInfo.impfeatures[j].selvalue) {
                                            ++check;
                                        }
                                    }
                                    if(!check) break;
                                }
                                if(check) {
                                    conceptsArray.push(conceptitem);
                                    oneConcept = false;
                                }
                            }
                        });
                    }
                });
            }
            this.props.actions.onConceptOptions(this.props.figInfo.id, conceptsArray);
            concept = <div id="concept-list"><p>Дать название</p><ConceptList figId={this.props.figInfo.id} impFeat={this.props.figInfo.impfeatures} oneConcept={oneConcept} concepts={this.props.figInfo.concepts} actions={this.props.actions} /></div>;
        }

        return(
            <div id="fig-info">
                <h2>{this.props.figInfo.figurename}</h2>
                <ImportantValueList figId={this.props.figInfo.id} features={this.props.figInfo.impfeatures} actions={this.props.actions} />
                {concept}
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            figInfo: state.figureinfo,
            conceptLi: state.selconcept,
        };
    },
    dispatch => {
        return {
            actions: {
                onConceptOptions: (figId, concepts) => {
                    const action = conceptOptions(figId, concepts);
                    dispatch(action);
                },
                onSelectValue: (figId, id, value) => {
                    const action = selectValue(figId, id, value);
                    dispatch(action);
                },
                onSelectConcept: (figId, conc) => {
                    const action = selectConcept(figId, conc);
                    dispatch(action);
                },
                onRenameConcept: (axeConc, newConc) => {
                    const action = renameConcept(axeConc, newConc);
                    dispatch(action);
                },
            }
        }
    }
)(FigureInfo);