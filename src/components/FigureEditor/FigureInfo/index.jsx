import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import $ from 'jquery';

import './style.css';
import ImportantValueList from '../ImportantValueList';
import ConceptList from '../ConceptList';
import { conceptOptions } from '../../../actions/FigureEditorActions';
import { selectValue } from '../../../actions/FigureEditorActions';

class FigureInfo extends React.Component {

    render() {

        let concept = null;
        if(this.props.figInfo.impfeatures[0] !== undefined) {

            let conceptsArray = [];
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
                            if(check)
                                conceptsArray.push(conceptitem);
                        }
                    });
                }
            });
            this.props.actions.onConceptOptions(conceptsArray);
            concept = <div id="concept-list"><p>Дать название</p><ConceptList concepts={this.props.figInfo.concepts} /></div>;
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
        };
    },
    dispatch => {
        return {
            actions: {
                onConceptOptions: (concepts) => {
                    const action = conceptOptions(concepts);
                    dispatch(action);
                },
                onSelectValue: (figId, id, value) => {
                    const action = selectValue(figId, id, value);
                    dispatch(action);
                },
            }
        }
    }
)(FigureInfo);