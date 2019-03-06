import React, { Component } from 'react';
import './LevelCreator.css';

class LevelCreator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            type: "",
            src: "",
            animated:false,
            frames:0,
            framesTo:0,
            framesFrom:0,
            frameIndex:0,
            framesX:0,
            framesY:0,
            framesW:0,
            framesH:0,
            w:1,
            h:1
        };
    }

    render() {
        let resArrX=[]
        let resArrY=[]
        let component = ""
        const arrW=24
        const arrH=12
        for(var i=arrH-1; i>=0; i--){
            resArrY=[]
            for(var j=0; j<arrW; j++){
                resArrY.push(<div className="cell" row={i} column={j}>{j}-{i}</div>)
            }
            resArrX.push(resArrY)
        }

        var divStyle = {
            display: 'grid',
            gridTemplateColumns: `repeat(${arrW}, 1fr)`
        }

        return (
          <div className="LevelCreator" id="LevelCreator">
             <select name="type" onChange={ e => this.handleChange(e)}>
                <option value="BACK">Background</option>
                <option value="PLATFORM">Platform</option>
                <option value="FRONT">Front</option>
                <option value="IMG">Image</option>
                <option value="PLAYER">Player</option>
                <option value="ITEM">Item</option>
            </select>
            <div className="container" style={divStyle}>{resArrX}</div>
          </div>
        );
    }
}

export default LevelCreator;