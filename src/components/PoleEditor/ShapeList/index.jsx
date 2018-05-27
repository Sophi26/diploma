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
            return <div className="shape-flex-box" key={key}>
                        <svg className="draggable" width={figure.icon.attrs.width} height={figure.icon.attrs.height} viewBox={figure.icon.attrs.viewBox}>
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
        
        let elem = e.target.closest('.draggable');
        console.log(elem);
        if (!elem) return;
        
        let drag_tmp = {
            elem: elem,
            downX: e.pageX,
            downY: e.pageY,
        };

        this.setState({ dragObject: drag_tmp });
    }

    moveDrag(e) {

        console.log("MOVE!!!");
        console.log(this.state);
        
        if (this.state.dragObject.elem === undefined) return;

        if (this.state.dragObject.avatar === undefined) {

            let moveX = e.pageX - this.state.dragObject.downX;
            let moveY = e.pageY - this.state.dragObject.downY;
            if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) return;
            let avatar = this.state.dragObject.elem;
            
            console.log("AVATAR!!!");
            console.log(avatar);

            /*let old = {
                parent: avatar.parentNode,
                nextSibling: avatar.nextSibling,
                position: avatar.style.position || '',
                left: avatar.style.left || '',
                top: avatar.style.top || '',
                zIndex: avatar.style.zIndex || ''
            };
            avatar.rollback = () => {
                old.parent.insertBefore(avatar, old.nextSibling);
                avatar.style.position = old.position;
                avatar.style.left = old.left;
                avatar.style.top = old.top;
                avatar.style.zIndex = old.zIndex;
            };*/

            this.setState({ dragObject: Object.assign(this.state.dragObject, {avatar: avatar}) }, () => {

                if (this.state.dragObject.avatar === undefined) {
                    this.setState({ dragObject: {} });
                    return;
                }
    
                let box = this.state.dragObject.avatar.getBoundingClientRect();      
                let coords = {
                    top: box.top + pageYOffset,
                    left: box.left + pageXOffset,
                };

                console.log("COORDS!!!");
                console.log(coords);

                let shiftX = this.state.dragObject.downX - coords.left;
                let shiftY = this.state.dragObject.downY - coords.top;
                this.setState({ dragObject: Object.assign(this.state.dragObject, {shiftX: shiftX, shiftY: shiftY}) }, () => {
      
                    document.body.appendChild(this.state.dragObject.avatar);
                    this.state.dragObject.avatar.style.zIndex = 9999;
                    this.state.dragObject.avatar.style.position = 'absolute';
                    this.state.dragObject.avatar.style.left = e.pageX - this.state.dragObject.shiftX + 'px';
                    this.state.dragObject.avatar.style.top = e.pageY - this.state.dragObject.shiftY + 'px';
                });  
            });  
        } else {

            this.state.dragObject.avatar.style.left = e.pageX - this.state.dragObject.shiftX + 'px';
            this.state.dragObject.avatar.style.top = e.pageY - this.state.dragObject.shiftY + 'px';
        }
    }

    endDrag(e) {

        console.log("END!!!");
        console.log(this.state);

        if(this.state.dragObject.avatar !== undefined) {

            console.log("TABLE!!!");
            this.state.dragObject.avatar.hidden = true;
            let elem = document.elementFromPoint(e.clientX, e.clientY);
            console.log(elem);
            this.state.dragObject.avatar.hidden = false;
        
            if (elem == null) return null;
            
            console.log(elem.closest('.droppable'));
        }

        this.setState({ dragObject: {} });
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