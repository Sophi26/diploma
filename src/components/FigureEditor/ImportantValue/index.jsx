import React from 'react';
import { render } from 'react-dom';
import classNames from 'classnames';

import './style.css';

class ImportantValue extends React.Component {

    render() {

        const options = this.props.feature.values.map((value, key) => {
            return <option value={key}>{value}</option>;
        });   

        return (
            <div className="imp-feature-item">
                <p>{this.props.feature === undefined ? "" : this.props.feature.name}</p>
                <select name="imp-value" className="select-value" onChange={this.selValue.bind(this)}>
                    {options}
                </select>
            </div>
        );
    }

    selValue(e) {
        this.props.actions.onSelectValue(this.props.figId, this.props.feature.id, e.target.options[e.target.selectedIndex].text);
        e.target.options[0].selected = true;
    }

}

export default ImportantValue