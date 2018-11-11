import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

const { remote } = require("electron");
const { dialog } = remote;

import './style.css';
import Concept from '../Concept';

class ConceptList extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            selectConceptId: null,
        }
    }

    render() {

        let i = 0;
        const elements = this.props.concepts.map((concept, key) => {
            i = key + 1;
            return <li key={key} onClick={this.selConc.bind(this, concept.id, concept)}>
                        <Concept concept={concept} isSelect={this.props.oneConcept ? concept.select : this.state.selectConceptId === concept.id} oneConcept={this.props.oneConcept} impFeat={this.props.impFeat} actions={this.props.actions} />
                    </li>;
        });

        const notSelectOther = <svg width="21px" height="21px" viewBox="0 0 24 24"><path fill="rgba(3, 3, 33, .7)" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>;
        const selectOther = <svg width="21px" height="21px" viewBox="0 0 24 24"><path fill="rgba(3, 3, 33, .7)" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" /></svg>;
   
        return(
            <ul id="concept-ul">
                {elements}
                {!this.props.oneConcept ? 
                <li key={i} onClick={this.selConcOther.bind(this, i)}>
                    {this.state.selectConceptId === i ? selectOther : notSelectOther}
                    <p>Другое...</p>
                    {this.state.selectConceptId === i ? <input type="text" name="conceptname" id="f-add-concept" onKeyDown={this.addConcept.bind(this)} /> : null}
                </li> : null}
            </ul>
        );
    }

    selConc(selectConceptId, concept) {
        
        this.setState({ selectConceptId });
        this.props.actions.onSelectConcept(this.props.figId, concept);
    }

    selConcOther(selectConceptId) {
        
        this.setState({ selectConceptId });
    }

    addConcept(e) {

        if (e.which === 13) {

            const inp_value = e.target.value;

            fetch("/api/concepts", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                for (let i = 0; i < data.length; ++i) {
                    if (data[i].conceptname === inp_value) {
                        dialog.showErrorBox("Данное понятие уже существует:(", "Введите, пожалуйста, другое имя!");
                        return;
                    }
                }

                let values = [];
                for (let i = 0; i < this.props.impFeat.length; ++i) {
                    values.push(this.props.impFeat[i].selvalue);
                }
                fetch("/api/concepts", {
                    method: "POST",
                    body: JSON.stringify({
                        conceptname: inp_value,
                        value: values,
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {

                    this.props.actions.onSelectConcept(this.props.figId, data);
                    this.setState({ selectConceptId: data.id });
                })
                .catch();
            })
            .catch();
        }
    }
}

export default ConceptList