import React, { Component } from "react";
import axios from 'axios';
import "../styles/searchbar.css";
import Metaphor from "../parts/Metaphor";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      formdata: {
        query: "",
        field: "source",
      },
      countState: false,
      loading: false,
      OutDetails: null,
      OutDetailsOther: null
    };
  }

  setValues = (type, e) => {
    if (type === "query") {
        this.setState({
          formdata: { ...this.state.formdata, query: e.target.value },
        });
        //console.log(e.target.value);
      }

      else if (type === "field") {
        this.setState({
          formdata: { ...this.state.formdata, field: e.target.value },
        });
      }

      
  };

  getSearchResults = () => {

    //this.state.OutDetails = [];

    this.setState({ loading: true });


    const in_field=this.state.formdata.field;

    //console.log(this.state.formdata.query,in_type,in_domain)
    
    if (in_field=="Source"){
        axios.post("http://localhost:3001/searchmetaphorsource",this.state.formdata)
        .then((response) => {
        this.setState({ OutDetails: response.data.data });
        //console.log(response.data.data.hits.hits);
        }, (error) => {
        console.log(error);
        });

    }
    else if(in_field=="Target"){
        axios.post("http://localhost:3001/searchmetaphortarget",this.state.formdata)
        .then((response) => {
        this.setState({ OutDetails: response.data.data });
        console.log(response.data);
        }, (error) => {
        console.log(error);
        });
    }
    else{
      axios.post("http://localhost:3001/searchbyother",this.state.formdata)
      .then((response) => {
      this.setState({ OutDetailsOther: response.data.data });
      console.log(response.data);
      }, (error) => {
      console.log(error);
      });
    }

  };

  
  render() {
    
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="relative flex flex-col h-full">
          <div
            className="flex flex-wrap content-center justify-center "
          >
            <div className="flex-container">
            <form >
            <label>
          <input type="text" placeholder="Type here to search" className="search-bar" value={this.state.query} onChange={(e) => this.setValues("query", e)} />
        </label>
              </form>
             
          <form>

          </form>
          <form>

      <select
          value={this.state.type}
          onChange={(e) => this.setValues("field", e)}
          className="metaphor-domain"
        >
           <option  value="Source">Metaphors Source </option>
           <option value="Target">Metaphors Target </option>
           <option value="Title_En">Title in English </option>
           <option value="Title_Si">Title in Sinhala </option>
           <option value="Artist_En">Artist in English </option>
           <option value="Artist_Si">Artist in Sinhala </option>
           <option value="Year">Year of the song </option>
           <option value="Lyricist_En">Lyricist in English </option>
           <option value="Lyricist_Si">Lyricist in Sinhala </option>
           <option value="Lyrics">Song Lyrics </option>
        </select>

          </form>

            <button className="search-button"
            onClick={this.getSearchResults}>
            Search
          </button>
              
            </div>
          </div>



          {this.state.OutDetails == null  ? null : (
          
          

          <Metaphor
          data={this.state.OutDetails}
          count={this.state.OutDetails.hits.total.value}
        />
        )}





        </div>
      </div>
    );
  }
}

export default SearchBar;