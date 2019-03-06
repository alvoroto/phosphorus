import React, { Component } from 'react';
import './LevelCreator.css';
import service from '../../api/levelService';

class LevelCreator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            level:{
            },
            type: "",
            pieces:[],
            selectedPiece:{}
        };
    }

    handleChange = e => {  
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSelectChange = e => {  
        const { name, value } = e.target;
        this.setState({ [name]: value }, ()=>{
            service.getPieces(this.state.type)
            .then(pieces => {
                this.setState({
                    ...this.state,
                    pieces: pieces.data.pieces
                })
                })
            }
        );
    }

    handlePieceSelection = (e, item) => { 
        this.setState({
            ...this.state,
            selectedPiece: item 
        });
    }

    mouseEnter(e) {
        e.target.style.backgroundImage = `url(${this.state.selectedPiece.src})`;
        e.target.style.backgroundSize = "cover";
        e.target.style.backgroundRepeat = "no-repeat";
        e.target.style.backgroundPosition = "center center";
    }
    
    mouseLeave(e) {
        e.target.style.backgroundImage = ``
    }

    render() {
        let resArrX=[]
        let resArrY=[]
        let component = ""
        const arrW=24
        const arrH=12

        var cellStyle = {
            backgroundColor: 'beige',
            border:'1px solid grey',           
        }

        for(var i=arrH-1; i>=0; i--){
            resArrY=[]
            for(var j=0; j<arrW; j++){
                resArrY.push(<div key={i+"-"+j} className="cell" row={i} column={j} style={cellStyle}
                onMouseEnter={e=>this.mouseEnter(e)} onMouseLeave={e => this.mouseLeave(e)}></div>)
            }
            resArrX.push(resArrY)
        }

        var divStyle = {
            display: 'grid',
            gridTemplateColumns: `repeat(${arrW},1fr)`,
            gridTemplateRows: `repeat(2fr)`,
            width:'70vw',
            height:'50vh'
        }

        let piecesList = this.state.pieces.map((item, i)=>{
            return (
            <li key={i}><div><span>{item.name}</span><img src={item.src} onClick={e => this.handlePieceSelection(e, item)} alt={item.name}/></div></li>
            )
        })

        return (
          <div className="LevelCreator" id="LevelCreator">
             <select name="type" onChange={ e => this.handleSelectChange(e)}>
                <option value="BACK">Background</option>
                <option value="PLATFORM">Platform</option>
                <option value="FRONT">Front</option>
                <option value="IMG">Image</option>
                <option value="PLAYER">Player</option>
                <option value="ITEM">Item</option>
            </select>
            <div>
                <ul>{piecesList}</ul>
            </div>
            <div className="container" style={divStyle}>{resArrX}</div>
          </div>
        );
    }
}

export default LevelCreator;