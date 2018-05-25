import React from 'react';
import { render } from 'react-dom';
import classNames from 'classnames';

import './style.css';
import ConceptValueList from '../ConceptValueList';

class SeeConcept extends React.Component {

    render() {

        const {concept, isOpenConcept, onConceptClick} = this.props;
        const activeClass = classNames({
            "active-conc": isOpenConcept,
        });
        const open = <svg width="21px" height="21px" viewBox="0 0 24 24"><path fill="rgba(3, 3, 33, .7)" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>;
        const close = <svg width="21px" height="21px" viewBox="0 0 24 24"><path fill="rgba(3, 3, 33, .7)" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>;
        const name = <a className={activeClass}>{concept.conceptname[0]}</a>;
        const allValues = isOpenConcept && <ConceptValueList values={concept.value} />;

        return (
            <div className="c-item">
                <div className="conc" onClick={onConceptClick}>
                    {isOpenConcept ? open : close}
                    {name}
                </div>
                <div id="v-li">
                    {allValues}
                </div>
            </div>
        );
    }
}

export default SeeConcept