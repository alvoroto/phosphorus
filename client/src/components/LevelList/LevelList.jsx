import React, { Component } from 'react';
import service from '../../api/levelService';
import { Link } from 'react-router-dom';

class LevelList extends Component {
    constructor(props) {
        super(props)
        this.state = {
          levelList:[]
        };
    }

    componentDidMount () {
       service.getLevelList()
       .then(res => {
            this.setState({
                ...this.state,
                levelList: res.data.levels 
            },()=>{console.log(this.state)});
        })

        
    }

    render(){
        let levelList = this.state.levelList.map((item, i)=>{
            console.log(item)
            return (
                <Link
                    style={{ textDecoration: 'none' }}
                    to={`/game/${item._id}`}
                    key={item._id}>
                        <li key={i} className="link"><div><span className="levelName">{item.name}</span> <span>-by {item.creator.username}-</span></div></li>
                </Link>
            )
        })
        return(
            <div className="LevelList">
                
                <ul>{levelList}</ul>
              
            </div>
        )
    }
}

export default LevelList;