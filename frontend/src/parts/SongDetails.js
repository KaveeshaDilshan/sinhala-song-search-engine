import React, { Component } from "react";
import "../styles/metaphors.css";
 
 const SongDetails=(props)=> {
   const data = React.useMemo(
     () => props.data 
   )

  const singer=data._source.Artist_Si;
  const lyricist=data._source.Lyricist_Si;
  const year=data._source.Year;
  const composer="data._source.composer";
  const lyrics=data._source.Lyrics.split("\n");
  const metaphor=data.inner_hits.Metaphors.hits.hits[0]._source.Metaphor;
  const meaning=data.inner_hits.Metaphors.hits.hits[0]._source.Meaning;
  const source_domain=data.inner_hits.Metaphors.hits.hits[0]._source.Source;
  const type="data.inner_hits.Metaphors.hits.hits[0]._source.type";
  const target_domain=data.inner_hits.Metaphors.hits.hits[0]._source.Target;
  console.log((metaphor.length/2) | 0);
  
   return (
    <div className="flex w-50 mr-2 rounded py-1 px-3 text-blue-900 border-2 border-blue-900 ">
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="song_topic">
          <h3>{metaphor}</h3>
          </div>
    <div className="song_details">
    <div className="lyricist">
      <b>Song   :</b> {lyrics[0]}
      </div>
      <div className="singer">
          <b>Singer   :</b> {singer}
      </div>

      <div className="lyricist">
      <b>Lyricist   :</b> {lyricist}
      </div>
      
     <div className="year">
     <b>Year    :</b> {year}
     </div>
      
     <div className="composer">
     <b>Composer :</b> {composer}
     </div>

     </div>
      
     <div className="lyrics">
     <div className="lyrics_heading">
          <b>Lyrics    :</b> 
          <br/>
          <br/>
      </div>
      {(() => {
            let divs = []; 
            for(let i = 0; i < lyrics.length; i++) {
              if (lyrics[i]==""){
                divs.push(<div key={i}><br/></div>);
              }
              else{
                let last =(metaphor.length/2) | 0;
                if (lyrics[i].includes(metaphor)){
                  divs.push(<div key={i}>
                    <b>{lyrics[i]}</b>
                    </div>);
                }
                else{
                  divs.push(<div key={i}>{lyrics[i]}</div>);
                }
              }
              
            }
        
            return divs;
          })()}
     </div>


     <div className="meta_details">
     <div className="meta">
     <b>Metaphor    :</b> {metaphor}
     </div>

     <div className="meaning">
     <b>Meaning     :</b> {meaning}
     </div>

     <div className="source_domain">
     <b>Source Domain:</b> {source_domain}
     </div>

     <div className="target_domain">
     <b>Target Domain:</b> {target_domain}
     </div>

     <div className="type">
     <b>Type         :</b> {type}
     </div>      

     </div>
       </div>
   )
}
 
export default SongDetails;


