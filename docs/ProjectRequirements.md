# Project Requirements

## Executive Summary
The vocabulary explorer is a way to explore information based on semantic class, or general meaning group. It will be based off of RapidWords or WordNet, which will be decided by the client closer to the time of development. The explorer allows users to expand or collapse different semantic classes in order to see which word(s) fall under that category. It will link to itwêwina in order to show paradigms when appropriate. 

Users will primarily be linguists and language learners. The explorer will present itself as an interactive graph with nodes that users can click on to expand a section further and gain more information. Graph nodes will be grouped based on semantic class and get more specific as the user clicks through. Each node will also display the word(s) we have in our dictionary that belong to that semantic class. Definitions can be linked at the word-level and direct the user to itwêwina.

## Project Glossary
### [Existing Itwêwina glossary](https://github.com/UAlbertaALTLab/morphodict/blob/main/docs/glossary.md)
!!! note ""
    English Mode - The display mode where English is used for the underlying structure of the tree. There may be nodes for which no Cree word exists included, linking Cree nodes.

    Cree Mode - The display mode where only Cree words will be displayed in the tree. Since the structure of the tree is still mapped onto English, these English nodes will be skipped over when displaying the tree.

    [RapidWords](https://semdom.org/) - A web-based tool for text summarization and keyword extraction. The website offers a user-friendly interface and allows users to upload documents or paste text directly into the website for summarization.

    [WordNet](http://wordnetweb.princeton.edu/perl/webwn) - A lexical database for the English language, developed by Princeton University. It organizes words into sets of synonyms and organizes them into semantic hierarchies, allowing for a better understanding of how words are related semantically. The website provides a user-friendly interface for accessing and exploring the WordNet database, allowing users to search for words and their definitions, synonyms, and related concepts.

    [Itwêwina](https://itwewina.altlab.app/) - A web-based platform for learning Cree, an indigenous language of Canada. The platform offers interactive lessons and exercises to help users learn the basics of Cree, including vocabulary, grammar, and pronunciation. It also features a variety of resources, including audio recordings, to help users improve their listening and speaking skills in the language.

    Hyponym - A word of more specific meaning than a general term applicable to it.

    Hypernym - A word with a broad meaning that more specific words fall under

    Breadcrumb - A small text path, indicating where the user is on the site

    Tag - A multicharacter symbol that represents a linguistic feature.

    Semantic Ontology - An ecosystem of words relating to each other based on their meaning.

    Tree - A tree is a hierarchical data structure defined as a collection of nodes.

## User Stories

### 1. EPIC - Search
!!! note ""
    As a user, I want to be able to search for a word.
#### [1.1]  Querying  (3pts)
{++As a user, I want to be sent to a results page ranked by relevance to my search query.++}

!!! note "Acceptance Tests"
    * User can search results are relevant to the searched term
    * User can search results include a definition of each term

#### [1.2]  Navigate to tree (5pts)
{++As a user, I want to click on a search result and it takes me to a tree of the word.++}

!!! note "Acceptance Tests"
    * View Cree mode tree
    * View English mode tree
    * View RapidWords
    * View Semantic Domains


### 2. EPIC - Tree interactions
!!! note ""
    As a user, I want to be able to explore the Cree language in the form of a tree.
#### [2.1]  Expand hypernyms (3pts)   
{++As a user, for a given node, if I click on the ‘+’ symbol I should see a list of hypernyms.++}

!!! note "Acceptance Tests"
    * Seeing all hypernyms without any being missed
    * Functional checkbox beside each item 
    * Hypernyms of sister words should not be displayed
#### [2.2]  Expand hyponyms (3pts)   
{++As a user, for a given node, if I click on the ‘-’ symbol I should see a list of hyponyms.++}

!!! note "Acceptance Tests"
    * Seeing all hyponyms without any being missed
    * Functional checkbox beside each item
    * Hyponyms of sister words should not be displayed

#### [2.3]  Select from hypernyms/hyponyms (5pts)  
{++As a user, I want to select words from the list of hypernyms/hyponyms and click done and see my selected terms displayed on the tree.++}

!!! note "Acceptance Tests"
    * Selection and deselection need to be tracked
    * Only selected words should be displayed in the tree

#### [2.4]  Moving around tree (5pts)   
{++As a user, I want to move around the tree.++}

!!! note "Acceptance Tests"
    * Button for zooming in/out zooms in and out by a certain amount
    * Zooming in/out capped after a certain amount
    * User should be able to freely move around the tree by holding right click and dragging
    * A focus button need to included so user can reset view back to center of tree
    * User should not be allowed to move too far away from the tree


#### [2.5]  See node details (5pts)   
{++As a user, I want to be able to select/click on a node in the graph, to see details about that word.++}

!!! note "Acceptance Tests"
    * As a user, I want to see the synonyms of the word in the details.
    * As a user, I want to see the definition of the word in the details.
    * As a user, I want to have a hyperlink to itwêwina, the plains Cree dictionary

#### [2.6]  Node colors (2pts)   
{++As a user, I want to see the different levels of the tree in different colors.++}

!!! note "Acceptance Tests"
    * Make sure colors are easy on the eyes of user
    * Make sure colors used are different for each level
    * Make sure text on nodes are visible with color used

#### [2.7]  Breadcrumb navigation (5pts)   
{++As a user, I want to have a breadcrumb above the tree, so I can keep a history of my actions.++}

!!! note "Acceptance Tests"
    * Clicking on any item on the breadcrumb navigates you to that node
    * Clicking on a previous node removes all subsequent nodes from the breadcrumb
    * Clicking on the node you are currently on should do nothing

#### [2.8]  Tree modes (5pts)   
{++As a user, I want to be able to view the tree in “English mode” or “Cree mode”.++}

!!! note "Acceptance Tests"
    * English mode shows the tree in english mode

    * Cree mode shows the tree in cree mode

#### [2.9]  Get root node (8pts)
{++ As a user, I want to be able to “jump” to the root node of a word.++}
!!! note "Acceptance Tests"
    * Jumping to root transition should be as smooth as possible
    * Jumping to root should not take too long for user
    * Jumping to root should not crash the site

#### [2.10] Default tree (5pts)
{++ As a user, I want to be able to explore the tree starting from the highest classification level on a default homepage.++}
!!! note "Acceptance Tests"
    * The site homepage should display a tree with the highest level semantic classifications (e.g. “entity”)

### 3. EPIC - Filtering
!!! note ""
    I want to explore related words by selecting tags
#### [3.1]  Filter search results (3pts)  
{++As a user, I want to be able to filter results by tags when I am searching.++}
!!! note "Acceptance Tests"
    * Users can filter search results to nouns, verbs, etc.

#### [3.2]  Filter node list (3pts)  
{++As a user, I want be able to filter the list of related nodes by tags when I am selecting nodes to add to the tree.++}
!!! note "Acceptance Tests"
    * Users can filter related nodes by selecting tags like nouns, verbs, etc.
#### [3.3]  Search node list (3pts)  
{++As a user, I want to be able to search the list of related nodes when I am selecting nodes to add to the tree.++}
!!! note "Acceptance Tests"
    * Users can filter related nodes by typing text into the list’s search bar

### 4. EPIC - Platforms
#### [4.1]  Mobile phone (8pts)  
{++As a user, I want to view the website on my mobile phone.++}
!!! note "Acceptance Tests"
    * Users can access all functionalities of the site on a phone.

#### [4.2]  Laptop (3pts)  
{++As a user, I want to view the website on my laptop.++}
!!! note "Acceptance Tests"
    * Users can access all functionalities of the site on a laptop.

#### [4.3]  Tablet (5pts)  
{++As a user, I want to view the website on my tablet.++}
!!! note "Acceptance Tests"
    * Users can access all functionalities of the site on a tablet.


### 5. EPIC - Exporting data
#### [5.1]  Export CSV (5pts)  
{++As a user, I want to export the data that I have explored as a CSV file++}
!!! note "Acceptance Tests"
    * Users can click a button that opens the raw data of the tree in a new tab.

    * Users can click a button that downloads the CSV of the tree.


## MoSCoW
### Must Have
!!! note ""
    + 1.1. As a user, I want to be sent to a results page ranked by relevance to my search query.

    + 1.2. As a user, I want to click on a search result and it takes me to a graph of the word.

    + 2.1. As a user, for a given node, if I click on the ‘+’ symbol I should see a list of hypernyms.

    + 2.2. As a user, for a given node, if I click on the ‘-’ symbol I should see a list of hyponyms.

    + 2.3. As a user, I want to select words from the list of hypernyms/hyponyms and click done and see my selected terms displayed on the tree.

    + 2.4. As a user, I want to move around the tree.

    + 2.5. As a user, I want to be able to select/click on a node in the graph, to see details about that word.

    + 4.1. As a user, I want to view the website on my mobile phone.

    + 4.2. As a user, I want to view the website on my laptop.

    + 4.3. As a user, I want to view the website on my tablet.

### Should Have
!!! note ""
    + 2.6. As a user, I want to see the different levels of the tree in different colors.
    + 2.8. As a user, I want to be able to view the tree in “English mode” or “Cree mode”.
    + 3.1. As a user, I want to be able to filter results by tags when I am searching.
    + 3.3. As a user, I want to be able to search the list of related nodes when I am selecting nodes to add to the tree.


### Could Have
!!! note ""
    + 2.7. As a user, I want to have a breadcrumb above the tree, so I can keep a history of my actions.
    + 2.10. As a user, I want to be able to explore the tree starting from the highest classification level on a default homepage.
    + 3.2. As a user, I want to be able to filter the list of related nodes by tags when I am selecting nodes to add to the tree.
    + 5.1. As a user, I want to export the data that I have explored as a CSV file or copy pasteable format.


### Would like But Won’t Get
!!! note ""
    - 2.9. As a user, I want to be able to “jump” to the root node of a word.

## Similar Products
* [RapidWords](https://semdom.org/)
    * A list of nearly 1800 semantic domains
    * A tool for collecting the words of a language and developing a dictionary
* [WordNet](https://wordnet.princeton.edu/)
    * A large lexical database of English
    * Nouns, verbs, adjectives and adverbs are grouped into sets of cognitive synonyms (synsets), each expressing a distinct concept
* [Itwêwina](https://itwewina.altlab.app/)
    * A Plains Cree Dictionary


## Open-source Projects
#### [UAlbertaALTLab](https://github.com/UAlbertaALTLab)
* 21st century tools for Indigenous languages
* User can search English and Cree words
* User can get information and pronunciation for each words.
#### [RapidWords](https://semdom.org/) 
- A web-based tool for text summarization and keyword extraction. The website offers a user-friendly interface and allows users to upload documents or paste text directly into the website for summarization.

#### [WordNet](http://wordnetweb.princeton.edu/perl/webwn) 
- A lexical database for the English language, developed by Princeton University. It organizes words into sets of synonyms and organizes them into semantic hierarchies, allowing for a better understanding of how words are related semantically. The website provides a user-friendly interface for accessing and exploring the WordNet database, allowing users to search for words and their definitions, synonyms, and related concepts.

#### [Itwêwina](https://itwewina.altlab.app/) 
- A web-based platform for learning Cree, an indigenous language of Canada. The platform offers interactive lessons and exercises to help users learn the basics of Cree, including vocabulary, grammar, and pronunciation. It also features a variety of resources, including audio recordings, to help users improve their listening and speaking skills in the language.

## Technical Resources
#### Frontend: React.js + D3.js
* [React JS documentation](https://reactjs.org/)
* [D3 documentation](https://d3js.org/)
#### Backend: Django + SQLite3
* [Django Documentation](https://docs.djangoproject.com/en/4.1/)
* [SQLite3 Documentation](https://sqlite.org/docs.html)
#### Deployment: Docker + NGINX
* [Docker Documentation](https://docs.docker.com/)
* [NGINX Documentation](https://docs.nginx.com/)
