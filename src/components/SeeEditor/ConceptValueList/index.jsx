import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';

class ConceptValueList extends React.Component {

    render() {

        const valueElements = this.props.values.map((value, key) => {
            return <li key={key}><p>{value}</p></li>;
        });
    
        return(
            <ul id="important-v-list">
                {valueElements}
            </ul>
        );
    }
}

export default ConceptValueList