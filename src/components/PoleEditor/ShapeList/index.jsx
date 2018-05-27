import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';

import './style.css';

class ShapeList extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            dragObject: {},
        }
    }

    render() {

        const figElements = this.props.figList.map((figure, key) => {
            const view = figure.icon.attrs.viewBox.split(' ');
            const x = Number(view[0]) + Number(view[2]) / 2;
            const y = Number(view[1]) + Number(view[3]) / 2;
            return <div className="draggable" key={key}>
                        <svg width={figure.icon.attrs.width} height={figure.icon.attrs.height} viewBox={figure.icon.attrs.viewBox}>
                            <path fill={figure.icon.childs[0].attrs.fill} d={figure.icon.childs[0].attrs.d} />
                            <text x={x} y={y} alignmentBaseline="middle" textAnchor="middle">{figure.concept !== undefined ? figure.concept : ''}</text>
                        </svg>
                    </div>;
        });

        return(
            <div id="all-shapes-ul-flex-container" onMouseDown={this.initDrag.bind(this)} onMouseMove={this.moveDrag.bind(this)} onMouseUp={this.endDrag.bind(this)}>
                {figElements}
            </div>
        );
    }

    initDrag(e) {

        console.log("START!!!");

        console.log(e.which);

        if (e.which != 1) {
            return;
        }
        
        let elem = e.target.closest('.draggable');
        console.log(elem);
        if (!elem) return;
        
        this.setState({
            dragObject: {
                elem: elem,
                downX: e.pageX,
                downY: e.pageY,
            },
        });
    }

    moveDrag(e) {

        if (this.state.dragObject.elem === undefined) return;

        if (this.state.dragObject.avatar === undefined) {

            let moveX = e.pageX - this.state.dragObject.downX;
            let moveY = e.pageY - this.state.dragObject.downY;
            if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) return;

            this.setState({ dragObject: Object.assign(this.state.dragObject, {avatar: this.createAvatar.bind(this, e)}), });
            if (this.state.dragObject.avatar === undefined) {
                this.setState({ dragObject: {} });
                return;
            }

            let coords = getCoords(this.state.dragObject.avatar);
            let shiftX = this.state.dragObject.downX - coords.left;
            let shiftY = this.state.dragObject.downY - coords.top;
            this.setState({ dragObject: Object.assign(this.state.dragObject, {shiftX: shiftX, shiftY: shiftY}), });

            this.startDrag.bind(this, e);
        }

        this.state.dragObject.avatar.style.left = e.pageX - this.state.dragObject.shiftX + 'px';
        this.state.dragObject.avatar.style.top = e.pageY - this.state.dragObject.shiftY + 'px';
    }

    createAvatar(e) {

        let avatar = this.state.dragObject.elem;
        let old = {
          parent: avatar.parentNode,
          nextSibling: avatar.nextSibling,
          position: avatar.position || '',
          left: avatar.left || '',
          top: avatar.top || '',
          zIndex: avatar.zIndex || ''
        };
      
        avatar.rollback = () => {
          old.parent.insertBefore(avatar, old.nextSibling);
          avatar.style.position = old.position;
          avatar.style.left = old.left;
          avatar.style.top = old.top;
          avatar.style.zIndex = old.zIndex;
        };
      
        return avatar;
    }

    startDrag(e) {

        let avatar = this.state.dragObject.avatar;
      
        document.body.appendChild(avatar);
        avatar.style.zIndex = 9999;
        avatar.style.position = 'absolute';
    }

    endDrag(e) {

        if(this.state.dragObject.avatar !== undefined) {
            this.finishDrag.bind(this, e);
        }

        this.setState({ dragObject: {} });
    }

    findDroppable(e) {

        this.state.dragObject.avatar.hidden = true;
        let elem = document.elementFromPoint(e.clientX, e.clientY);
        this.state.dragObject.avatar.hidden = false;
      
        if (elem == null) return null;
        
        console.log("END!!!");
        console.log(elem.closest('.droppable'));
    }
}

export default connect(
    state => {
        return {
            figList: state.figures,
        };
    },
    dispatch => {
        return {
            actions: {
                
            }
        }
    }
)(ShapeList);