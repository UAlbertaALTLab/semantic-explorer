import { searchRWRelations, searchRWByDomain } from "../../../api/Search";

export async function constructRWTreeData(domain) {
  const relations = await searchRWRelations(domain);
  if (Object.keys(relations).length === 0) return {}; // if relations is empty, return empty object
  var root_name = relations.hypernyms[0].domain;

    var treeData = {
    name: root_name,
    nodesLoad: 0,
    creeWordsLoaded: false,
    creeWords: [],
    children: [
      { 
        name: relations.domain, 
        creeWordsLoaded: false,
        creeWords: [],
        children: relations.hyponyms.map((hyponym) => {
          return { 
            name: hyponym.domain,
            creeWords: [], 
            creeWordsLoaded: false,
          }
        })
      }
    ]
  };
  return treeData;
}

export function constructInitialGraph(domain) {
  return {
    name: domain,
    isInit: true,
  }
}

  // given data, I want to find the node that has name parent, and add children to it
// data can be infinite, so I need to recursively search through it
// if the root node name is not parent, then I need to search through the children
// if the root node name is parent, then I need to add children to it
// if the root node name is not parent, and it has no children, then I need to return
// example: data = {name: "root", children: [{name: "child1", children: [{name: "child2"}]}]}
// parent = "child1"
// childrenList = [{name: "child3"}]
// output = {name: "root", children: [{name: "child1", children: [{name: "child2"}, {name: "child3"}]}]}
export function addChildrentoParentThenReturnNewGraphData(data, parent, childrenList) {
  if (data.name === parent) {
    data.children = childrenList;
    return data;
  }
  if (data.children) {
    for (var i = 0; i < data.children.length; i++) {
      addChildrentoParentThenReturnNewGraphData(data.children[i], parent, childrenList);
    }
  }
  return data;
}

// Given a domain, constructs and returns the data for the RWTree
export async function constructRWTreeDataNormal(domain) {
  const relations = await searchRWRelations(domain);
  if (Object.keys(relations).length === 0) return {}; // if relations is empty, return empty object
  var root_name = relations.hypernyms[0].domain;

    var treeData = {
    name: root_name,
    nodesLoad: 0,
    creeWordsLoaded: false,
    creeWords: [],
    children: [
      { 
        name: relations.domain, 
        creeWordsLoaded: false,
        creeWords: [],
        children: relations.hyponyms.map((hyponym) => {
          return { 
            name: hyponym.domain,
            creeWords: [], 
            creeWordsLoaded: false,
          }
        })
      }
    ]
  };
  return treeData;
}

export async function constructRWTreeDataOld(domain) {
  // return searchRWRelations(domain).then(test);
  const relations = await searchRWRelations(domain);
  if (Object.keys(relations).length === 0) return {}; // if relations is empty, return empty object
  var root_name = relations.hypernyms[0].domain;

  var treeData = {
    name: root_name,
    nodesLoad: 0,
    creeWords: await searchRWByDomain(root_name),
    creeWordsLoaded: true,
    children: [
      { 
        name: relations.domain, 
        creeWords: await searchRWByDomain(relations.domain), 
        // Promise.all() is used to wait for all the map array's promises to resolve https://stackoverflow.com/a/40140562/16752053
        children: await Promise.all(relations.hyponyms.map(async (hyponym) => {
          return { 
            name: hyponym.domain, 
            creeWords: await searchRWByDomain(hyponym.domain) 
          }
        }))
      }
    ]
  };

  return treeData;
}

export async function constructChildrenDomains(parentName) {
  // return searchRWRelations(domain).then(test);
  const relations = await searchRWRelations(parentName);
  if (Object.keys(relations).length === 0) return {}; // if relations is empty, return empty object
  //var root_name = relations.hypernyms[0].domain;

  var childrenList =  await Promise.all(relations.hyponyms.map(async (hyponym) => {
          return { 
            name: hyponym.domain, 
          }
        }));

  console.log("the function is returning: ", childrenList);
  return childrenList
  };

  export async function constructParentDomainAndAllChildren(childName) {
    // return searchRWRelations(domain).then(test);
    const relations = await searchRWRelations(childName);
    if (Object.keys(relations).length === 0) return {}; // if relations is empty, return empty object
    //var root_name = relations.hypernyms[0].domain;
    var domain = "No parent domain"
    var domainChildren = [];
    if (relations.hypernyms.length > 0) {
      domain = relations.hypernyms[0].domain;
      domainChildren = await searchRWRelations(domain).then(relations => {
        return Promise.all(relations.hyponyms.map(async (hyponym) => {
          return { 
            name: hyponym.domain, 
          }
        }));
      });
    } else {
      return null
    }
    return {
      name: domain,
      children: domainChildren
    };
    };

    // given data, I want to find the node that has name nodename, and add creeWords to it
// data can be infinite, so I need to recursively search through it
// if the root node name is not nodename, then I need to search through the children
// if the root node name is nodename, then I need to add creeWords to it
// if the root node name is not nodename, and it has no children, then I need to return
// creeWords is a list of strings
export function addCreeWordstoNodeThenReturnNewGraphData(data, nodeName, creeWords) {
  if (data.name === nodeName) {
    data.creeWords = creeWords;
    return data;
  }
  if (data.children) {
    for (var i = 0; i < data.children.length; i++) {
      addCreeWordstoNodeThenReturnNewGraphData(data.children[i], nodeName, creeWords);
    }
  }
  return data;
}

// First I want to iniliaze a new graph object with the root node as the parent object
// then I want to find the root node of graphData in the children list of new graph object, and replace it with graphData
// example
// old parent node: {name: "A", children: [{name: "B", children: [{name: "C"}]}]}
// new parent node: {name: "D", children: [{name: "E", children: [{name: "F"}]}, {name: "A", children: [{name: "B", children: [{name: "C"}]}]}]}
// newGraphData: {name: "D", children: [{name: "E", children: [{name: "F"}]}, {name: "A", children: [{name: "B", children: [{name: "C"}]}]}]}
export function generateGraphWithNewParent(graphData, parentObject) {
  var newGraphData = {
    name: parentObject.name,
    children: parentObject.children
  }
  // find the root node of graphData in the children list of new graph object, and replace it with graphData
  for (var i = 0; i < newGraphData.children.length; i++) {
    if (newGraphData.children[i].name === graphData.name) {
      newGraphData.children[i] = graphData;
      break;
    }
  }

  return newGraphData;
}

export async function getChildren(nodeDatum) {
  console.log("I should get the children of ", nodeDatum.name)
  const childrenObject = await constructChildrenDomains(nodeDatum.name);
  return childrenObject;
}

export async function getParentAndSiblings(nodeDatum) {
  console.log("I should get the parent and siblings of", nodeDatum.name)
  const parentAndChildrenObject = await constructParentDomainAndAllChildren(nodeDatum.name);
  return parentAndChildrenObject;
}
