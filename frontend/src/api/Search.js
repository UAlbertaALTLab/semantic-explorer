import axios from 'axios';
import { timeout } from 'd3';

// Given a rapidwords domain or index, returns a json object defining the hyponyms and hypernym of the domain
// Example response:
// {
//   "index": "6.3.1",
//   "domain": "Domesticated animal",
//   "hypernyms": [
//       {"index": "6.3", "domain": "Animal husbandry"}
//   ],
//   "hyponyms": [
//       {"index": "6.3.1.1", "domain": "Cattle"},
//       {"index": "6.3.1.2", "domain": "Sheep"},
//       {"index": "6.3.1.4", "domain": "Goat"},
//       {"index": "6.3.1.5", "domain": "Pig"},
//       {"index": "6.3.1.6", "domain": "Dog"},
//       {"index": "6.3.1.7", "domain": "Cat"},
//       {"index": "6.3.1.8", "domain": "Beast of burden"}
//   ]
// }
export function searchRWRelations(domain){
  if (!domain) return;
  
  return axios.get('https://api.itwewina2.altlab.dev/api/rapidwords/', {
    params: {
      q: domain
    }
  }).then((response) => {
    var domainData = response.data;
    
    if (domainData.response === "No results found") return {};
    
    var formattedData = {
      index: domainData.index,
      domain: domainData.domain,
      hypernyms: [],
      hyponyms: [],
    };
    if (domainData.hyponyms) domainData.hyponyms = domainData.hyponyms.split(';').map(s => s.trim());
    if (domainData.hypernyms) domainData.hypernyms = domainData.hypernyms.split(';').map(s => s.trim());
    if (domainData.hyponyms) {
      for (const hyponym of domainData.hyponyms) {
        formattedData.hyponyms.push(formatDomain(hyponym));
      };
    }
    
    if (domainData.hypernyms) {
      for (const hypernym of domainData.hypernyms) {
        formattedData.hypernyms.push(formatDomain(hypernym));
      };
    }
    
    return formattedData;
  })
  .catch((error) => {
    console.log(error);
    return null;
  });
}

function formatDomain(domain_str) {
  const re_index = /\d[\.\d]*/;
  const index_str = re_index.exec(domain_str)[0];
  // const re_domain = /([A-z]+ *)+/;
  
  return {
    index: index_str,
    domain: domain_str.replace(re_index, '').trim()
  };
}

// Given a rapidwords domain, returns an array objects of all the words in that domain
// [
//   { "word": "a",
//     "slug": "a",
//     "definition": {} },
//   { "word": "b",
//     "slug": "b",
//     "definition": {} },
// ]
export function searchRWByDomain(domain){
  if (!domain) return;
  var formattedDomain = domain.replace(', ', '_').toLowerCase();
  
  return axios.get('https://api.itwewina2.altlab.dev/api/search/', {
    params: {
      rw_domain: formattedDomain
    }
  }).then(
    (response) => {
      var wordsArray = response.data.search_results;
      var formattedArray = [];
      
      for (const word of wordsArray) {
        // TODO: add more info to the word object, and checking for false domain matches
        formattedArray.push({
          word: word.lemma_wordform.text, 
          slug: word.lemma_wordform.slug,
          definitions: word.lemma_wordform.definitions,
          });
      }
      
      return formattedArray;
    }
  ).catch((error) => {
    console.log(error);
    return null;
  });
}

// a function that mocks the searchRWByDomain function
// this is used for testing purposes
// should return the list ['a', 'b', 'c'] as response
export function searchRWByDomainMock(domain){
  if (!domain) return;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(['a', 'b', 'c']), 1000);
  });
}

//{search('dog').then(res => {console.log(res)})}
export function search(query){
  try {
      return axios.get('https://api.itwewina2.altlab.dev/api/search/',
        {params: {
          name: query
        }}
        ).then(res => res.data)
    }

    catch (error) {
      console.log(error);
    }
}

