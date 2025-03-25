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

    var contextInfo = [] // [info(list with 2 items), recording, inflection category, emoji, [category, tooptip text], stem, pos]

    if (search_data.search_results[i]['relabelled_fst_analysis']['plain_english'] != undefined){
      contextInfo.push(search_data.search_results[i]['relabelled_fst_analysis']['plain_english'])
    }else{
      contextInfo.push(null)
    }

    if (search_data.search_results[i]['recording'] != ""){
      contextInfo.push(search_data.search_results[i]['recording'])
    }else{
      contextInfo.push(null)
    }

    contextInfo.push(search_data.search_results[i]['lemma_wordform']['inflectional_category'])

    if (search_data.search_results[i]['lemma_wordform']['wordclass_emoji'] != null){
      contextInfo.push(search_data.search_results[i]['lemma_wordform']['wordclass_emoji'])
    }else{
      contextInfo.push(null)
    }

    var subInflec = []
    if (search_data.search_results[i]['lemma_wordform']['inflectional_category_plain_english'] != null){
      subInflec.push(search_data.search_results[i]['lemma_wordform']['inflectional_category_plain_english'])
      var subInflecToolTipTxt = search_data.search_results[i]['lemma_wordform']['inflectional_category_linguistic'] + ' (' + search_data.search_results[i]['lemma_wordform']['text'] + ') - tâpiskôc: ' + search_data.search_results[i]['lemma_wordform']['inflectional_category_plain_english'].replace('like: ', '')
      subInflec.push(subInflecToolTipTxt)
    }else{
      subInflec.push("None")
    }
    contextInfo.push(subInflec)

    if(search_data.search_results[i]['lemma_wordform']['linguist_info']['stem'] != undefined){
      contextInfo.push(search_data.search_results[i]['lemma_wordform']['linguist_info']['stem'])
    }else{
      contextInfo.push(null)
    }

    var domains = search_data.search_results[i]['lemma_wordform']['rw_domains'].split(';').map((x) => x.trim()) // please notes domain list can include "" item

    // Remove Duplicate Entries from the List
    var domainSet = new Set();
    if (domains) {
      for (var j = 0; j < domains.length; j++) {
        var domain = domains[j].toLowerCase();
        domain = domain.replaceAll('_', ' ')
        domainSet.add(domain);
      }
    }

    // Convert the Set back to an array
    domains = Array.from(domainSet);
    
    var domains_raw = []
    for(var item in domains){
      if(domains[item] == ""){
        domains.splice(item, 1)
        continue
      }
      var firstChar = domains[item].charAt(0).replace(' ', '')
      domains[item] = firstChar + domains[item].slice(1)
      domains[item] = domains[item].replaceAll('_', ' ')

      domains_raw.push(domains[item].charAt(0).toUpperCase() + domains[item].slice(1))
    }

    // var input contains " 6.3.1.7.1; 6.3.1.5.1; 6.3; 6.3.1.5; 6.3.1;"
    // output should look like ['6.3.1.7.1', '6.3.1.5.1', '6.3', '6.3.1.5', '6.3.1']
    var rw_indices_string = search_data.search_results[i]['lemma_wordform']['rw_indices']
    var rw_indices_cleaned = rw_indices_string.split(";")
    for(var item in rw_indices_cleaned){
      //if rw_indices_cleaned[item] == "", remove it
      if(rw_indices_cleaned[item] == ""){
        rw_indices_cleaned.splice(item, 1)
        continue
      }
      rw_indices_cleaned[item] = rw_indices_cleaned[item].trim()
    }

    data[numItem]['context'] = contextInfo
    data[numItem]['domains'] = domains
    data[numItem]['domains_raw'] = domains_raw
    data[numItem]['rw_indices'] = rw_indices_cleaned
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
                          {data[index]['context'].map((item, i)=>{
                            if(i==0 && item.length!=0){ //[info(list with items), recording link, inflection category, emoji, [category, tooptip text], stem]
                              return <Tooltip key={i} title={<div>{item[0]}<br></br>{item[1]}</div>}><img id='info' src={info}/></Tooltip>
                            }else if(i==0){
                              return
                            }else if(i==1 && item!=null){
                              return <img id='voice' key={i} src={voice} onClick={() => startAudio(item)}/>
                            }else{
                              return
                            }
                          })}
                        </div>

                        <div id='secondline_parent'>
                          {data[index]['context'].map((item, i) => {
                            if(i==2){
                              return <h3 className='word_body' key={i}>{item}</h3>
                            }else if(i==3 && item!=null){
                              return <h3 className='item word_body' key={i}>{item}</h3>
                            }else if(i==3){
                              return
                            }else if(i==4){
                              if(item == "None"){
                                return <h3 className='item word_body' key={i}>{item[0]}</h3>
                              }else{
                                return <Tooltip key={i} title={item[1]}><h3 className='item word_body' id='like_secondline'>{item[0]}</h3></Tooltip> 
                              }
                            }else if(i==5 && item!=null){
                              return <Tooltip key={i} title={item}><img className='item' src={book}/></Tooltip> 
                            }else if(i==5){
                              return
                            } 
                          })}
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
                                onClick={() => {setGraphWord(data[index]['domains_raw'][i])}}>{item}</Button>
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
