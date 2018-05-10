import React from 'react';
import { render } from 'react-dom';
import classNames from 'classnames';

import './style.css';

class Feature extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            isRename: false,
            value_name: this.props.feature.featurename[0],
        }
    }

    render() {

        const {feature, isValueShown, onFeatureNameClick} = this.props;
        const activeClass = classNames({
            "active-feature": isValueShown,
        });
        const name = feature.featurename.map((featureName) => {
            return <a className={activeClass} onClick={onFeatureNameClick}>{featureName}</a>;
        })[0];
        const input = <input type="text" autoFocus="true" value={this.state.value_name} onChange={this.handleChange.bind(this)} onKeyDown={this.renFeature.bind(this)} />;

        return (
            <div className="feature-item">
                {this.state.isRename ? input : name}
                <div className="feature-edit">
                    <a onClick={this.openInput.bind(this)}>
                        <svg width="21px" height="21px" viewBox="0 0 24 24">
                            <path fill="rgba(3, 3, 33, .7)" d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29" />
                        </svg>
                    </a>
                    <a onClick={this.delFeature.bind(this)}>
                        <svg width="21px" height="21px" viewBox="0 0 24 24">
                            <path fill="rgba(3, 3, 33, .7)" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </svg>
                    </a>
                </div>
            </div>
        );
    }

    delFeature() {

        fetch("/api/attributes/" + this.props.feature.id[0], {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                this.props.actions.onDeleteFeature(data.id[0]);
            })
            .catch();
    }

    openInput() {
        this.setState({
            isRename: !this.state.isRename,
            value_name: this.props.feature.featurename[0],
        });
    }

    handleChange (e) {
        this.setState({
            value_name: e.target.value,
        });
    }

    renFeature(e) {

        if (e.which === 13) {
            fetch("/api/attributes", {
                method: "PUT",
                body: JSON.stringify({
                    id: this.props.feature.id[0],
                    featurename: e.target.value,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                this.props.actions.onRenameFeature(data.id[0], data.featurename[0]);
                this.setState({
                    isRename: false,
                });
            })
            .catch();
        }
    }
}

export default Feature