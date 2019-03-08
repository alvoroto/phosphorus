import React, { Component } from 'react';
import service from '../../api/pieceService';

class Piece extends Component {
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

    handleChange = e => {  
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleChecked = e => {  
        this.setState({ [e.target.name]: e.target.checked });
    }


  // this method handles just the file upload
  handleFileUpload = e => {
    e.preventDefault()
    
    console.log("The file to be uploaded is: ", e.target.files[0]);
   
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route

    service.handleUpload(e.target.files[0])
    .then(photoData => {
        this.setState({
          ...this.state,
          src: photoData.url
        })
      })

    }

    // this method submits the form
    handleSubmit = e => {
        e.preventDefault();

        service.saveNewThing(this.state)
        .then(res => {
            console.log('added: ', res);
            // here you would redirect to some other page 
        })
        .catch(err => {
            console.log("Error while adding the thing: ", err);
        });
    }  
    render() {
        return (
          <div className="Piece">
            <h2>New Piece</h2>
            <form className="pieceForm" onSubmit={e => this.handleSubmit(e)}>
                <div className="form-row">
                    <label>Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={ this.state.name } 
                        onChange={ e => this.handleChange(e)} />
                </div>
                <div className="form-row">
                    <label>Type</label>
                    <select name="type" onChange={ e => this.handleChange(e)}>
                        <option value="BACK">Background</option>
                        <option value="PLATFORM">Platform</option>
                        <option value="FRONT">Front Image</option>
                        <option value="IMG">Back Image</option>
                        <option value="PLAYER">Player</option>
                        <option value="COLITEM">Colectable Item</option>
                        <option value="DAMITEM">Damage Item</option>
                        <option value="POWITEM">Power Item</option>

                    </select>
                </div>
                <div className="form-row">
                <input 
                    type="file" 
                    onChange={(e) => this.handleFileUpload(e)} /> 
                </div>
                <div className="form-row">
                    <label>Is animated</label>
                    <input 
                        type="checkbox" 
                        name="animated" 
                        onChange={ e => this.handleChecked(e)} />
                </div>
                <div style={{display: this.state.animated ? '' : 'none' }} >
                    {/* <label>Frames</label>
                    <input 
                        type="number" 
                        name="frames" 
                        value={ this.state.frames } 
                        onChange={ e => this.handleChange(e)} />
                    <label>Frames To</label>
                    <input 
                        type="number" 
                        name="framesTo" 
                        value={ this.state.framesTo } 
                        onChange={ e => this.handleChange(e)} />
                    <label>Frames From</label>
                    <input 
                        type="number" 
                        name="framesFrom" 
                        value={ this.state.framesFrom } 
                        onChange={ e => this.handleChange(e)} />
                    <label>Frame Index</label>
                    <input 
                        type="number" 
                        name="frameIndex" 
                        value={ this.state.frameIndex } 
                        onChange={ e => this.handleChange(e)} />
                    <label>Frames X</label>
                    <input 
                        type="number" 
                        name="framesX" 
                        value={ this.state.framesX } 
                        onChange={ e => this.handleChange(e)} />
                    <label>Frames Y</label>
                    <input 
                        type="number" 
                        name="framesY" 
                        value={ this.state.framesY } 
                        onChange={ e => this.handleChange(e)} />
                    <label>Frames W</label>
                    <input 
                        type="text" 
                        name="framesW" 
                        value={ this.state.framesW } 
                        onChange={ e => this.handleChange(e)} />
                    <label>Frames H</label>
                    <input 
                        type="text" 
                        name="framesH" 
                        value={ this.state.framesH } 
                        onChange={ e => this.handleChange(e)} /> */}
                </div>
                <div className="form-row">
                    <button type="submit">Save new Piece</button>
                </div>
            </form>
          </div>
        );
    }
}

export default Piece;