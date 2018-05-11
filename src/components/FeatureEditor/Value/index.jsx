import './style.css';

import React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';

class Value extends Component {

    constructor(props){

        super(props);

        this.state = {
            isRename: false,
            value_name: this.props.value,
        }
    }

    render() {

        const {value} = this.props;
        const name = <a>{value}</a>;
        const input = <input type="text" autoFocus="true" value={this.state.value_name} onChange={this.handleChange.bind(this)} onKeyDown={this.renValue.bind(this)} />;

        return (
            <div className="value-item">
                {this.state.isRename ? input : name}
                <div className="value-edit">
                    <a onClick={this.openInput.bind(this)}>
                        <svg width="21px" height="21px" viewBox="0 0 24 24">
                            <path fill="rgba(3, 3, 33, .7)" d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29" />
                        </svg>
                    </a>
                    <a onClick={this.delValue.bind(this)}>
                        <svg width="21px" height="21px" viewBox="0 0 24 24">
                            <path fill="rgba(3, 3, 33, .7)" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </svg>
                    </a>
                </div>
            </div>
        )
    }

    delValue() {

        fetch("/api/values/" + this.props.featureId + "/" + this.props.value, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                this.props.actions.onDeleteValue(this.props.featureId, data.valuename);
            })
            .catch();
    }

    openInput() {
        this.setState({
            isRename: !this.state.isRename,
            value_name: this.props.value,
        });
    }

    handleChange (e) {
        this.setState({
            value_name: e.target.value,
        });
    }

    renValue(e) {

        if (e.which === 13) {
            const prev = this.props.value;
            fetch("/api/values", {
                method: "PUT",
                body: JSON.stringify({
                    id: this.props.featureId,
                    prevaluename: prev,
                    valuename: e.target.value,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                this.props.actions.onRenameValue(this.props.featureId, prev, data.valuename);
                this.setState({
                    isRename: false,
                });
            })
            .catch();
        }
    }
}

export default Value