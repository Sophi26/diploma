import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';
import SampleList from '../SampleList';
import UserList from '../UserList';
import { userSelect } from '../../../actions/PlayEditorActions';

class PlayShapeList extends React.Component {

    render() {

        let sampleShapes = [];
        for(let i = 0; i < this.props.sampleUl.length; ++i) {              

            let sample = <SampleList key={i} sample={this.props.sampleUl[i]} />;
            sampleShapes.push(sample);
        }

        const userShapes = <UserList shapes={this.props.userUl} actions={this.props.actions} />;

        return(
            <div id="play-shapes-flex-container">
                {sampleShapes}
                {userShapes}
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            sampleUl: state.samplelist,
            userUl: state.userlist,
        };
    },
    dispatch => {
        return {
            actions: {
                onUserSelect: (fig) => {
                    const action = userSelect(fig);
                    dispatch(action);
                },
            }
        }
    }
)(PlayShapeList);