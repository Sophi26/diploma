import React from 'react';
import { render } from 'react-dom';
import classNames from 'classnames';

import './style.css';
import ImportantFeatureList from '../ImportantFeatureList';

class Figure extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            isRename: false,
            value_name: this.props.figure.figurename,
        }
    }

    render() {

        const {figure, isOpenFigure, onFigureClick} = this.props;
        const activeClass = classNames({
            "active-figure": isOpenFigure,
        });
        const open = <a><svg width="21px" height="21px" viewBox="0 0 24 24"><path fill="rgba(3, 3, 33, .7)" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg></a>;
        const close = <a><svg width="21px" height="21px" viewBox="0 0 24 24"><path fill="rgba(3, 3, 33, .7)" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg></a>;
        const name = <a className={activeClass}>{figure.figurename}</a>;
        const input = <input type="text" autoFocus="true" value={this.state.value_name} onChange={this.handleChange.bind(this)} onKeyDown={this.renFigure.bind(this)} />;

        return (
            <div className="figure-item">
                {isOpenFigure ? open : close}
                {figure.icon}
                {this.state.isRename ? input : name}
                <div className="figure-edit">
                    <a onClick={this.openInput.bind(this)}>
                        <svg width="21px" height="21px" viewBox="0 0 24 24">
                            <path fill="rgba(3, 3, 33, .7)" d="M16.84,2.73C16.45,2.73 16.07,2.88 15.77,3.17L13.65,5.29L18.95,10.6L21.07,8.5C21.67,7.89 21.67,6.94 21.07,6.36L17.9,3.17C17.6,2.88 17.22,2.73 16.84,2.73M12.94,6L4.84,14.11L7.4,14.39L7.58,16.68L9.86,16.85L10.15,19.41L18.25,11.3M4.25,15.04L2.5,21.73L9.2,19.94L8.96,17.78L6.65,17.61L6.47,15.29" />
                        </svg>
                    </a>
                    <a onClick={this.delFigure.bind(this)}>
                        <svg width="21px" height="21px" viewBox="0 0 24 24">
                            <path fill="rgba(3, 3, 33, .7)" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </svg>
                    </a>
                </div>
                
            </div>
        );
    }

    delFigure() {

        this.props.actions.onDeleteFigure(this.props.figure.id);
    }

    openInput() {
        this.setState({
            isRename: !this.state.isRename,
            value_name: this.props.figure.figurename,
        });
    }

    handleChange (e) {
        this.setState({
            value_name: e.target.value,
        });
    }

    renFigure(e) {

        if (e.which === 13) {
            this.props.actions.onRenameFigure(this.props.figure.id, e.target.value);
            this.setState({
                isRename: false,
            });
        }
    }
}

export default Figure