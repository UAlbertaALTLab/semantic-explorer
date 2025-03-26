import './ResultsSection.css';
import {List, ListItem} from '@mui/material'; 
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import info from '../../images/info.png';
import voice from '../../images/voice.png'; 
import book from '../../images/book.png';
import Tooltip from '@mui/material/Tooltip';
import { search } from '../../api/Search.js';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { theTheme } from '../../App';
import rapidwordsData from '../../data/rapidwords.json';

var loading = true;
var data = {} // the data to be stored 
var dataLength = 0; // the number of data items to be displayed
var search_data;
var pos = 'Default';

// Construct Data Object From Search Query Data
function constructData(){
  var numItem = 0;
  dataLength = 0;
  data = {};
  for (var i=0; i<search_data.search_results.length; i++){
    if(pos != "Default" && search_data.search_results[i]['lemma_wordform']['linguist_info']['pos'] !== pos){
      continue
    }

    dataLength +=1;

    data[numItem] = {id: i}

    var definitions = []
    var defNum = 1;
    for (var j=0; j<search_data.search_results[i]['lemma_wordform'].definitions.length; j++){
      var currDef = [] // the definition followed by its citations
      currDef.push(defNum.toString() + '. ' + search_data.search_results[i]['lemma_wordform'].definitions[j]['text'])
      var listOfCitations = search_data.search_results[i]['lemma_wordform'].definitions[j]['source_ids'];
      for (var k=0; k<listOfCitations.length; k++){
        currDef.push(listOfCitations[k]);
      }
      definitions.push(currDef) 
      defNum+=1
    }
    data[numItem]['def'] = definitions

    let rw_indices = search_data.search_results[i]['lemma_wordform']['rapidwords']
    let domains = rw_indices.map((x) => rapidwordsData[x].domain)
    
    data[numItem]['domains'] = domains
    data[numItem]['rw_indices'] = rw_indices
    numItem +=1;
  }
}

// Generate Results Section With Search Results
function ResultsSection(){
  const [isLoading, setIsLoading] = useState(loading);
  const [searchData, setSearchData] = useState(null);
  const { searchTerm, Pos } = useParams();

  useEffect(() => {
    setIsLoading(true)
    pos = Pos
    search(searchTerm).then(res => {
      search_data = res; 
      constructData();
      setSearchData(res); 
      setIsLoading(false);
    });
  }, [searchTerm, Pos]);

  const gotToResults = useNavigate();
  const setGraphWord = (word) => {
    // data.setSelectedWord(word);
    gotToResults(`/wordtree/rapidwords/${word}`)
  }
  
  var audio;
  var playingAudio = false;
  const startAudio = (link) => {
    if(playingAudio){
      audio.pause();
      playingAudio = false;
    }
    audio = new Audio(link);
    if(!playingAudio){
      audio.play();
      playingAudio = true;
    }
  }

  if (isLoading) {
    return <div id='body'><CircularProgress /></div>;
  }
  
  return (
    <div id='main'>
      <List sx={{overflow: 'auto', width: '100%', height:'100%', background: {theTheme}}}> {/* background here relates to light and dark mode */}
        {
          Object.keys(data).map(
            function(key, index){
              return(
                <ListItem sx={{width:'100%', marginBottom: '20px'}} key={index} component="div" disablePadding name='ListItemName'>
                  <div id="flex_list">
                    <div id="listItem">
                      <div id="left_listitem_content">
                        <div id='firstline_parent'>
                          <h1 id="word_title">{search_data.search_results[data[index].id]['lemma_wordform']['text']}</h1>
                        </div>

                        <div id="definitions">
                          {data[index]['def'].map((item, i) => {   // iterate through data items
                            return  <div key={i}><h1 className='definition'>{item[0]}</h1>{
                              item.map((txt,j)=>{if(j!=0){
                                var tooltiptxt;
                                if(txt == "CW"){
                                  tooltiptxt = "Wolvengrey, Arok, editor. Cree: Words. Regina, University of Regina Press, 2001."
                                }else if(txt == "AECD"){
                                  tooltiptxt = "Alberta Elders' Cree Dictionary/alberta ohci kehtehayak nehiyaw otwestamâkewasinahikan, compiled by Nancy LeClaire and George Cardinal, edited by Earle H. Waugh. Edmonton: University of Alberta Press, 2002."
                                }else if(txt == "MD"){
                                  tooltiptxt = "Maskwacis Dictionary. Maskwacîs, Maskwachees Cultural College, 1998."
                                }
                                return <Tooltip key={j} title={tooltiptxt}><h3 className='citations'>{txt}</h3></Tooltip>}
                              })
                            }</div>
                          })}
                        </div>
                      </div>
                      <div id="right_listitem_content">
                        <div className='inline_items'>
                          <div className='right_list'>
                            <h1 className='word_body'>RapidWords</h1>
                            <div className='list_of_domains'>
                              {/* <Link to="/wordtree" style={{textDecoration:'none'}}> */}
                              {data[index]['domains'].map((item, i)=>{
                                if (item != '') { // if the domain is not empty 
                                return <Button key={index} className="graph_button" sx={{
                                  fontFamily: 'Open Sans, sans-serif',
                                  fontSize: '0.8rem',
                                  color: '#fff',
                                  border: '2px solid #D9EDFF',
                                  display: 'block',
                                  width: '100%',
                                  marginBottom: '5px',
                                  background: '#339DFF',
                                  color: 'white',
                                  textDecoration: 'none',
                                  WebkitTransition: 'all 0.3s',
                                  transition: 'all 0.3s',
                                  boxShadow: '0 4px 4px rgba(83, 100, 255, 0.32)',
                                  '&:hover': {
                                    background: '#fff',
                                    color: '#339DFF',
                                    boxShadow: '0 4px 4px rgba(83, 100, 255, 0.32)'
                                  }
                                }}       
                                onClick={() => {setGraphWord(data[index]['rw_indices'][i])}}>{item}</Button>
                              }
                              })}
                              {/* </Link> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ListItem>
              )
            }
          )
        }
      </List>
    </div>
  );
}

export default ResultsSection;
