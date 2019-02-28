import React, { Component } from 'react';
import Matter from 'matter-js'

    // set up module aliases
    var Engine = Matter.Engine,
    World = Matter.World,
    Render = Matter.Render,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse;

export default class Game extends Component{
    constructor(props){
        super(props);
  
        this.state = { 
            width:window.innerWidth,
            height:window.innerHeight
        }
        
        
    }
    
    componentDidMount () {
        this.drawCanvas()
    }

    componentDidUpdate () {
        this.drawCanvas()
    }

    drawCanvas () {
        const canvas = document.getElementById("cv")
        const appDiv = document.getElementById("Game")
        if (appDiv) {
            const context = canvas.getContext('2d')
            canvas.width = window.innerWidth;  // set canvas width and height to browser window size
            canvas.height = window.innerHeight;
            
            // add a function to adjust the canvas size if the screen is resized
            window.onresize = function(event) {
                console.log("ei")
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            };
            
            var engine = Engine.create();
            var render = Render.create({
                canvas: canvas,
                engine: engine,
                options: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    wireframes: false
                }
             });
            var box = Bodies.rectangle(this.convertSize(5), this.convertSize(0), this.convertSize(1), this.convertSize(1));
            var ground = Bodies.rectangle(this.convertSize(12), this.convertSize(12), this.convertSize(23), this.convertSize(1), { isStatic: true });
            World.add(engine.world, [box, ground]);
            Engine.run(engine);
            Render.run(render);
        }
    }

    convertSize(size){
        return document.getElementById("cv").width/24*size
    }

   

    render(){
        return(
            <div className="Game" id="Game">
               <canvas id="cv"></canvas>
            </div>
        )
    }

}