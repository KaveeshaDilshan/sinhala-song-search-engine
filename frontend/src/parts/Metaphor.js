import React, { Component } from "react";
import axios from 'axios';
import SongDetails from "./SongDetails";
import "../styles/metaphors.css";

class Metaphor extends Component {
  constructor(props) {
    super(props);
    this.state = {
        song_details: "",
      };

  }

  

  handleClick(data) {
    this.setState({ song_details: data });
    
  }


  render() {
    return (
      <div className="block_container">
     <div className="block1">
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="meta_topic">
          <h3>Metaphors</h3>
          </div>
     {(() => {
            let divs = []; 
            let obj_list=this.props.data.hits.hits;  
            for(let i = 0; i < this.props.count; i++) {
              let obj=obj_list[i];
              let met_obj=obj.inner_hits.Metaphors.hits.hits[0];
              let class_name="metaphor_right";
              if(i%2==0){
                class_name="metaphor_left";
              }
              divs.push(<div key={i}
                tabIndex="1"
                className={class_name}
                onClick={() => this.handleClick(obj)}
              >{met_obj._source.Metaphor}</div>);
            }
        
            return divs;
          })()}

        {this.props.count > 0  ? null : (
          <div className="no_meta">
          <h2>No metaphors Available</h2>
          </div>
        )}
     
     </div>
            <div  className="block2">
            


        {this.state.song_details == ""  ? null : (
                  <>

                  <div>
                  <SongDetails 
            data={this.state.song_details}
              />
                  </div>
                    {" "}
                  </>
                )}


              </div>

      </div>
    );
  }
}

export default Metaphor;