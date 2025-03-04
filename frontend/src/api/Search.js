import axios from 'axios';
import rapidwordsData from '../data/rapidwords.json'; // Already parsed JSON, no need for JSON.parse

console.log(rapidwordsData);

// Given a rapidwords index, returns a JSON object defining the domain
export async function searchRWRelations(index) {
  if (!index) return;

  try {
    const response = await axios.get('https://itwewina.altlab.dev/api/rapidwords-index/', {
      params: { rw_index: index }
    });

    const results = response.data.results;
    if (!results || results.length === 0) return {};

    // Extract domain name based on the index position
    const rwDomains = results[0]?.lemma_wordform?.rw_domains || [];
    const rwIndices = results[0]?.lemma_wordform?.rw_indices || [];

    let domain = "Unknown Domain";
    const indexPosition = rwIndices.indexOf(index);
    if (indexPosition !== -1 && indexPosition < rwDomains.length) {
      domain = rwDomains[indexPosition];
    }

    // Await async functions to retrieve related words
    const creeWords = await getCreeWords(index);
    const hypernyms = getHypernyms(index);
    const hyponyms = getHyponyms(index);

    const resultData = {
      index: index,
      domain: domain,
      hypernyms: hypernyms,
      hyponyms: hyponyms,
      creeWords: creeWords
    };

    // Log the result data BEFORE returning
    logData("searchRWRelations Result", resultData);

    return resultData;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Function to retrieve all Cree words from the results array
export async function getCreeWords(index) {
  if (!index) return [];

  try {
    const response = await axios.get('https://itwewina.altlab.dev/api/rapidwords-index/', {
      params: { rw_index: index }
    });

    const results = response.data.results;
    if (!results || results.length === 0) return [];

    // Extract Cree words from each result object
    const creeWords = results
      .map(result => result?.lemma_wordform?.text)
      .filter(word => word);
    
    // Log the extracted words
    logData("Cree Words", creeWords);

    return creeWords;
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Function to get hypernyms for a given index
export function getHypernyms(index) {
  if (!index || !rapidwordsData[index]) return [];

  const hypernyms = rapidwordsData[index].hypernyms || [];
  const formattedHypernyms = hypernyms.map(hypernym => [
    hypernym,
    rapidwordsData[hypernym]?.domain || "Unknown"
  ]);

  // Log hypernyms
  logData("Hypernyms", formattedHypernyms);

  return formattedHypernyms;
}

// Function to get hyponyms for a given index
export function getHyponyms(index) {
  if (!index || !rapidwordsData[index]) return [];

  const hyponyms = rapidwordsData[index].hyponyms || [];
  const formattedHyponyms = hyponyms.map(hyponym => [
    hyponym,
    rapidwordsData[hyponym]?.domain || "Unknown"
  ]);

  // Log hyponyms
  logData("Hyponyms", formattedHyponyms);

  return formattedHyponyms;
}

// Function to search RW by domain
export function searchRWByDomain(index) {
  if (!index) return;
  
  return axios.get('https://itwewina.altlab.dev/api/rapidwords-index/', {
    params: { rw_index: index }
  }).then((response) => {
      // Use 'results' instead of 'search_results' for the new API response
      const wordsArray = response.data.results;
      const formattedArray = [];
      
      for (const word of wordsArray) {
        // TODO: add more info to the word object, and check for false domain matches
        formattedArray.push({
          word: word.lemma_wordform.text,
          slug: word.lemma_wordform.slug,
          definitions: word.lemma_wordform.definitions,
        });
      }

      // Log search results
      logData("Search RW By Domain", formattedArray);
      
      return formattedArray;
    }
  ).catch((error) => {
    console.log(error);
    return null;
  });
}

// Function to search for the index of a domain name
export function searchDomainIndex(domainName) {
  for (const index in rapidwordsData) {
    if (rapidwordsData[index].domain === domainName) {
      return index;
    }
  }
  return null; // Return null if the domain name is not found
}

// Logging function with correct template literal usage
export function logData(label, data) {
  console.log(`\n=== ${label} ===`);
  console.log(JSON.stringify(data, null, 2));
}

// Legacy search function (unchanged)
export function search(query) {
  try {
    return axios.get('https://api.itwewina2.altlab.dev/api/search/', {
      params: { name: query }
    }).then(res => res.data);
  } catch (error) {
    console.log(error);
  }
}