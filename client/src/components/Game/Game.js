import React, { Component } from 'react';
import GameController from './GameController';

export default class Game extends Component{
    constructor(props){
        super();
        this.game = new GameController();
    }
    
    componentDidMount () {
        this.drawCanvas()
    }

    componentDidUpdate () {
        this.drawCanvas()
    }

    drawCanvas () {
        const canvas = document.getElementById("canvas")
        canvas.width = window.innerWidth-50;
        canvas.height = window.innerHeight-50;

        window.onresize = function(event) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        this.game.init(canvas);
            
    }

    render(){
        return(
            <div className="Game" id="Game">
               <canvas id="canvas"></canvas>
            </div>
        )
    }

}