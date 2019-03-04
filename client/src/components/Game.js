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

        this.keyCodes = {
            TOP_KEY: 38,
            SPACE: 32,
            LEFT_KEY: 37,
            RIGHT_KEY: 39,
            D_KEY: 68,
            F_KEY: 70
        }

        this.keys=[]
        
        
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
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            };
            
            var engine = Engine.create();
            var render = Render.create({
                canvas: canvas,
                engine: engine,
                options: {
                    wireframes: false
                }
             });
            var box = Bodies.rectangle(this.convertSize(5), this.convertSize(8), this.convertSize(1), this.convertSize(1));
            box.friction = 0;
            box.frictionAir = 0;
            box.restitution = 0;
            var ground = Bodies.rectangle(this.convertSize(12), this.convertSize(12), this.convertSize(23), this.convertSize(1), { isStatic: true });
            World.add(engine.world, [box, ground]);
            Engine.run(engine);
            Render.run(render);

            //Body.setVelocity( box, {x: 10, y:0});
            document.body.addEventListener("keydown", (e) => {
                this.keys[e.keyCode] = true;
                if (e.keyCode == this.keyCodes.SPACE) {
                    Body.applyForce( box, {x: box.position.x, y: box.position.y}, {x: 0, y: -0.05});
                }
            });
            document.body.addEventListener("keyup",(e) => {
                this.keys[e.keyCode] = false;
            });

            Events.on(engine, "beforeTick", (event) => {
                console.log(box.force.x)
                if (this.keys[38]) {
                    //Body.setVelocity( box, {x: 10, y:box.velocity.y});
                }
                if (this.keys[37]) {
                    console.log(box.velocity.x)
                    if(box.velocity.x>-1){
                        Body.applyForce( box, {x: box.position.x, y: box.position.y}, {x: -0.005, y: 0});
                    }
                   
                    //Body.setVelocity( box, {x: -10, y:box.velocity.y});
                } else if (this.keys[39]) {
                    console.log(box.velocity.x)
                    if(box.velocity.x<1){
                        Body.applyForce( box, {x: box.position.x, y: box.position.y}, {x: 0.005, y: 0});
                    }
                    //Body.setVelocity( box, {x: 10, y:0});
                } else {
                    Body.applyForce( box, {x: box.position.x, y: box.position.y}, {x: -box.force.x, y: 0});
                }
                
            });


            // if(this.keys[this.keyCodes.RIGHT_KEY]) {
            //     Body.setVelocity( box, {x: 10, y:0});
            // }

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