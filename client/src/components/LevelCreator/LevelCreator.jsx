import React, { Component } from 'react';
import './LevelCreator.css';
import service from '../../api/levelService';

class LevelCreator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            level:{
                name: "",
                creator : this.props.loggedInUser._id,
                platforms : [],
                collectableItems : [],
                damageItems : [],
                powerItems : [],
                frontImages:[],
                backImages:[],
                background : "",
                playerX : 0,
                playerY : 0
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

    handleLevelChange = e => {  
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            level:{
                ...this.state.level,
                [name]: value
            }
        });
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
        e.target.style.backgroundImage += `url(${this.state.selectedPiece.src})`;
        e.target.style.backgroundSize = "cover";
        e.target.style.backgroundRepeat = "no-repeat";
        e.target.style.backgroundPosition = "center center";
    }
    
    mouseLeave(e) {
        if(!e.target.selected){
            e.target.style.backgroundImage = ``
        }
    }

    mouseClick(e) {
        if(this.state.selectedPiece.type){
            e.target.selected=true
            e.target.style.backgroundImage = `url(${this.state.selectedPiece.src})`;
            console.log(this.state)
            switch(this.state.selectedPiece.type) {
                case "BACK":
                    this.setState({
                        ...this.state,
                        level:{
                            ...this.state.level,
                            background:{
                                ...this.state.level.background,
                                src:this.state.selectedPiece.src
                            }
                        },
                    });

                  break;
                case "PLATFORM":
                    let newPlatform = { 
                        piece:this.state.selectedPiece._id ,
                        x: Number(e.target.getAttribute("column")),
                        y: Number(e.target.getAttribute("row")),
                        w: 1,
                        h: 1
                    }
                    let newPlatforms = [...this.state.level.platforms]
                    newPlatforms.push(newPlatform)
                    this.setState({
                        ...this.state,
                        level:{
                            ...this.state.level,
                            platforms:newPlatforms
                        }
                    });
                  break;
                case "FRONT":
                    let newFrontImage = { 
                        piece:this.state.selectedPiece._id ,
                        x: Number(e.target.getAttribute("column")),
                        y: Number(e.target.getAttribute("row")),
                        w: 1,
                        h: 1
                    }
                    let newFrontImages = [...this.state.level.frontImages]
                    newFrontImages.push(newFrontImage)
                    this.setState({
                        ...this.state,
                        level:{
                            ...this.state.level,
                            frontImages:newFrontImages
                        }
                    });
                  break;

                case "IMG":
                    let newBackImage = { 
                        piece:this.state.selectedPiece._id ,
                        x: Number(e.target.getAttribute("column")),
                        y: Number(e.target.getAttribute("row")),
                        w: 1,
                        h: 1
                    }
                    let newBackImages = [...this.state.level.backImages]
                    newBackImages.push(newBackImage)
                    this.setState({
                        ...this.state,
                        level:{
                            ...this.state.level,
                            backImages:newBackImages
                        }
                    });
                  break;

                case "PLAYER":
                    let newPlayer = { 
                        piece:this.state.selectedPiece._id ,
                        x: Number(e.target.getAttribute("column")),
                        y: Number(e.target.getAttribute("row")),
                        w: 1,
                        h: 1
                    }
                    this.setState({
                        ...this.state,
                        level:{
                            ...this.state.level,
                            player:newPlayer
                        }
                    });
                  break;
                case "COLITEM":
                  // code block
                  break;
                case "DAMITEM":
                  // code block
                  break;
                case "POWITEM":
                  // code block
                  break;
                default:
                  // code block
              }
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state.level);
        service.saveNewLevel(this.state.level)
        .then(res => {
            console.log('added: ', res);
        })
        .catch(err => {
            console.log("Error while adding the thing: ", err);
        });
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
                resArrY.push(
                <div key={i+"-"+j} className="cell" row={i} column={j}  selected={false} style={cellStyle}
                onMouseEnter={e=>this.mouseEnter(e)} onMouseLeave={e => this.mouseLeave(e)}
                onClick={e=>this.mouseClick(e)}>
                </div>)
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
            <label>Level Name</label>
            <input 
                type="text" 
                name="name" 
                value={ this.state.level.name } 
                onChange={ e => this.handleLevelChange(e)} />
            <form onSubmit={e => this.handleSubmit(e)}>
                <button type="submit">Save new Level</button>
            </form>
             <select name="type" onChange={ e => this.handleSelectChange(e)}>
                <option value="BACK">Background</option>
                <option value="PLATFORM">Platform</option>
                <option value="FRONT">Front Image</option>
                <option value="IMG">Back Image</option>
                <option value="PLAYER">Player</option>
                <option value="COLITEM">Colectable Item</option>
                <option value="DAMITEM">Damage Item</option>
                <option value="POWITEM">Power Item</option>
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