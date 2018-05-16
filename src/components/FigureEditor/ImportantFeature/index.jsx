import React from 'react';
import { render } from 'react-dom';
import classNames from 'classnames';

import './style.css';

class ImportantFeature extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            isSelect: this.props.feature.important,
        }
    }

    render() {

        const check = <svg width="21px" height="21px" viewBox="0 0 24 24" onClick={this.deselectFeature.bind(this)}><path fill="rgba(3, 3, 33, .7)" d="M19,19H5V5H15V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V11H19M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" /></svg>;
        const not_check = <svg width="21px" height="21px" viewBox="0 0 24 24" onClick={this.selectFeature.bind(this)}><path fill="rgba(3, 3, 33, .7)" d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" /></svg>;

        return (
            <div className="feature-li">
                {this.state.isSelect ? check : not_check}
                <p>{this.props.feature.featurename[0]}</p>
            </div>
        );
    }

    selectFeature() {
        this.setState({
            isSelect: true,
        });
        this.props.actions.onSelectFeature(this.props.figId, this.props.feature.id[0], this.props.feature.featurename[0]);
    }

    deselectFeature() {
        this.setState({
            isSelect: false,
        });
        this.props.actions.onDeselectFeature(this.props.figId, this.props.feature.id[0]);
    }
}

export default ImportantFeature