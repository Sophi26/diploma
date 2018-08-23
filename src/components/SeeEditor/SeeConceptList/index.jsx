import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';
import SeeConcept from '../SeeConcept';
import { openConcept } from '../../../actions/SeeEditorActions';

class SeeConceptList extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            openConceptId: null,
        }
    }

    render() {

        let i = 0;
        const conceptElements = this.props.conceptList.map((concept, key) => {
            i = key + 1; 
            return <li key={key}>
                        <SeeConcept concept={concept}   
                                isOpenConcept={this.state.openConceptId === concept.id} 
                                onConceptClick={this.openConcept.bind(this, concept.id, concept.conceptname)} />
                    </li>;
        });
    
        const activeClass = classNames({
            "active-conc": this.state.openConceptId === i,
        });

        return(
            <ul id="c-list">
                {conceptElements}
                <li key={i} onClick={this.openNotConcept.bind(this, i)}><a className={activeClass}>Без названия</a></li>
            </ul>
        );
    }

    openConcept(openConceptId, conceptname) {
        
        this.setState({ openConceptId });

        let sh = [];
        this.props.allshape.forEach(figure => {
            if(figure.concept === conceptname)
                sh.push(figure);
        });
        this.props.actions.onOpenConcept(openConceptId, conceptname, sh);   
    }

    openNotConcept(openConceptId) {
        
        this.setState({ openConceptId });

        let sh = [];
        this.props.allshape.forEach(figure => {
            if(figure.concept === undefined)
                sh.push(figure);
        });
        this.props.actions.onOpenConcept(openConceptId, 'Без названия', sh);   
    }
}

export default connect(
    state => {
        return {
            conceptList: state.selconcept,
            allshape: state.figures,
        };
    },
    dispatch => {
        return {
            actions: {
                onOpenConcept: (id, name, shapes) => {
                    const action = openConcept(id, name, shapes);
                    dispatch(action);
                },
            }
        }
    }
)(SeeConceptList);