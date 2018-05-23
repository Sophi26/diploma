import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import './style.css';
import Concept from '../Concept';

class ConceptList extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            isOther: true,
        }
    }

    render() {

        const notSelectOther = <svg width="21px" height="21px" viewBox="0 0 24 24"><path fill="rgba(3, 3, 33, .7)" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" /></svg>;
        const selectOther = <svg width="21px" height="21px" viewBox="0 0 24 24"><path fill="rgba(3, 3, 33, .7)" d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7Z" /></svg>;
    
        return(
            <ul id="concept-ul">
                <li>
                    {this.state.isOther ? selectOther : notSelectOther}
                    <p>Другое...</p>
                    {this.state.isOther ? <input type="text" name="conceptname" id="f-add-concept" /> : null}
                </li>
            </ul>
        );
    }
}

export default ConceptList