import { searchRWRelations, getCreeWords, searchDomainIndex, requestRWFromStore } from "../../../api/Search";
import rapidwordsData from "../../../data/rapidwords.json";

// Constructs an initial node with a given word and (optional) rapidwords index
export function constructInitialGraph(word, store) {
  let index = searchDomainIndex(word)

  requestRWFromStore(index, store)
  
  return {
    name: word,
    index: index,
    isInit: true,
    children: [],
    children_indexes: []
  };
}

// Recursively traverses the graph tree and adds childrenList to the node with the matching name
export function addChildrentoParentThenReturnNewGraphData(data, parent, childrenList) {
  if (data.name === parent) {
    data.children = childrenList;
    return data;
  }
  if (data.children) {
    for (let i = 0; i < data.children.length; i++) {
      data.children[i] = addChildrentoParentThenReturnNewGraphData(data.children[i], parent, childrenList);
    }
  }
  return data;
}

// Given a parent rapidwords index, returns an array of child nodes using local rapidwords.json data
export function constructChildrenDomains(parentIndex, store) {
  if (!parentIndex || !rapidwordsData[parentIndex]) return [];
  
  const hyponyms = rapidwordsData[parentIndex].hyponyms || [];
  const childrenList = hyponyms.map(childIndex => ({
    name: rapidwordsData[childIndex]?.domain || "Unknown",
    index: childIndex
  }));
  
  hyponyms.forEach(childIndex => {
    requestRWFromStore(childIndex, store)
  });

  console.log("constructChildrenDomains returning:", childrenList);
  return childrenList;
}

// Given a child rapidwords index, returns its parent domain (if any) along with all of the parent's children (i.e. siblings)
export function constructParentDomainAndAllChildren(childIndex, store) {
  if (!childIndex || !rapidwordsData[childIndex]) return null;
  
  const childData = rapidwordsData[childIndex];
  if (!childData.hypernyms || childData.hypernyms.length === 0) return null;
  
  // Use the first hypernym as the parent
  const parentIndex = childData.hypernyms[0];
  const parentData = rapidwordsData[parentIndex];
  if (!parentData) return null;
  
  requestRWFromStore(parentIndex, store)

  const domainChildren = (parentData.hyponyms || []).map(idx => ({
    name: rapidwordsData[idx]?.domain || "Unknown",
    index: idx
  }));

  domainChildren.forEach(child => requestRWFromStore(child.index, store))
  
  return {
    name: parentData.domain,
    index: parentIndex,
    children: domainChildren
  };
}

// Recursively traverses the graph to attach Cree words to the node that matches nodeName
export function addCreeWordstoNodeThenReturnNewGraphData(data, nodeName, creeWords) {
  if (data.name === nodeName) {
    data.creeWords = creeWords;
    return data;
  }
  if (data.children) {
    for (let i = 0; i < data.children.length; i++) {
      data.children[i] = addCreeWordstoNodeThenReturnNewGraphData(data.children[i], nodeName, creeWords);
    }
  }
  return data;
}

// Generates a new graph object with a new parent by replacing a matching child node
export function generateGraphWithNewParent(graphData, parentObject) {
  const newGraphData = {
    name: parentObject.name,
    index: parentObject.index,
    children: parentObject.children
  };
  
  for (let i = 0; i < newGraphData.children.length; i++) {
    if (newGraphData.children[i].name === graphData.name) {
      newGraphData.children[i] = graphData;
      break;
    }
  }
  
  return newGraphData;
}

// Given a node (which should include a rapidwords index), returns its children nodes using local data
export async function getChildren(nodeDatum, store) {
  console.log("I should get the children of", nodeDatum.name);
  if (!nodeDatum.index) {
    console.error("No rapidwords index provided for", nodeDatum.name);
    return [];
  }
  return constructChildrenDomains(nodeDatum.index, store);
}

// Given a node (which should include a rapidwords index), returns its parent and siblings using local data
export async function getParentAndSiblings(nodeDatum, store) {
  console.log("I should get the parent and siblings of", nodeDatum.name);
  if (!nodeDatum.index) {
    console.error("No rapidwords index provided for", nodeDatum.name);
    return null;
  }
  return constructParentDomainAndAllChildren(nodeDatum.index, store);
}
