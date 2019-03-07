import React, { Component } from 'react';
import GameController from './GameController';
import service from '../../api/levelService';

export default class Game extends Component{
    constructor(props){
        super();
        this.state = {
            levelId: undefined,
            totalGame:[],
            game : new GameController()
        };
        

    }
    
    componentDidMount () {
        this.setState({
            ...this.state,
            levelId: this.props.match.params.id 
        },()=>{
            service.getLevel(this.state.levelId)
            .then(level => {
                let newTotalGame = [...this.state.totalGame]
                newTotalGame.push(level.data.totalGame)
                this.setState({
                    ...this.state,
                    totalGame: newTotalGame
                },()=>this.drawCanvas())
            })
        });
    }

    componentDidUpdate () {
       // this.drawCanvas()
    }

    drawCanvas () {
        const canvas = document.getElementById("canvas")
        canvas.width = window.innerWidth-50;
        canvas.height = window.innerHeight-50;

        window.onresize = function(event) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        this.state.game.init(canvas, this.state.totalGame);
            
    }

    render(){
        return(
            <div className="Game" id="Game">
               <canvas id="canvas"></canvas>
            </div>
        )
    }

}