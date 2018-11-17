import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

const { remote } = require("electron");
const { dialog } = remote;

import './style.css';

class Concept extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            isRename: false,
            value_name: this.props.concept.conceptname,
        }
    }

    render() {

        const notSelectOther = <svg width="21px" height="21px" viewBox="0 0 24 24" onClick={this.selConcept.bind(this)}><path fill="rgba(3, 3, 33, .7)" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>;
        const selectOther = <svg width="21px" height="21px" viewBox="0 0 24 24"><path fill="rgba(3, 3, 33, .7)" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" /></svg>;
    
        const name = <p>{this.props.concept.conceptname}</p>;
        const input = <div id="ren-input"><input type="text" autoFocus="true" value={this.state.value_name} onChange={this.handleChange.bind(this)} onKeyDown={this.renConcept.bind(this)} /></div>;

        return(
            <div class="concept-item">
                {this.props.isSelect ? selectOther : notSelectOther}
                {this.state.isRename ? input : name}
                {this.props.oneConcept ?
                <div id="concept-edit">
                    <a onClick={this.openInput.bind(this)}>
                        <svg width="21px" height="21px" viewBox="0 0 24 24">
                            <path fill="rgba(3, 3, 33, .7)" d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29" />
                        </svg>
                    </a>
                </div> : null}
            </div>
        );
    }

    openInput() {
        this.setState({
            isRename: !this.state.isRename,
            value_name: this.props.concept.conceptname,
        });
    }

    handleChange (e) {
        this.setState({
            value_name: e.target.value,
        });
    }

    selConcept() {
        
        this.props.actions.onSelectConcept(this.props.figId, this.props.concept);
    }

    renConcept(e) {

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

                    this.props.actions.onRenameConcept(this.props.concept.conceptname, data.conceptname);
                    this.setState({
                        isRename: false,
                    });
                })
                .catch();
            })
            .catch(); 
        }
    }
}

export default Concept