import { Box, ButtonGroup, Button, Container, Tooltip, Zoom, Typography} from '@mui/material';
import { PlayArrow, InfoOutlined, LaunchOutlined} from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { 
  addChildrentoParentThenReturnNewGraphData, 
  addCreeWordstoNodeThenReturnNewGraphData,
  generateGraphWithNewParent,
  getChildren,
  getParentAndSiblings,
} from './utils/constructRWTreeData';
import { IconButton } from '@material-ui/core';
import { searchRWByDomain, searchDomainIndex } from '../../api/Search';
import {List} from '@mui/material'; 
import CircularProgress from '@mui/material/CircularProgress';
import './styles/WordTree.css'
import setColor from './utils/setColor';

// Each node in the graph is a foreignObject element, which allows us to render arbitrary HTML within the SVG.
// This component is responsible for rendering the foreignObject node.
const RenderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
    classes,
    graphData,
    updateGraphData,
    overWriteGraphData,
    snackBar,
    setSnackBar,
    Loading,
    setLoading,
    reRender,
    rwRequests
  }) => {

  // Log the nodeDatum.name
  //console.log("nodeDatum.name:", nodeDatum.name);

  return (
    <>
      {/* `foreignObject` requires width & height to be explicitly set. */}
      <foreignObject {...foreignObjectProps}>
        <Box style={{background: '#f3f3f3', width: 260, borderBottom: '1px solid rgba(0, 0, 0, 0.5)', borderLeft: '1px solid rgba(0, 0, 0, 0.5)', borderRight: '1px solid rgba(0, 0, 0, 0.5)', borderRadius: "15px", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <ButtonGroup>
            <Tooltip title="View Parent" TransitionComponent={Zoom} placement="top">
              <Button name={"hypernymButton" + nodeDatum.name}
                  style={{borderRadius: "15px", color: "white", background: "#1c1d21"}}
                  onClick={() => {
                    setLoading(true)
                    getParentAndSiblings(nodeDatum, rwRequests).then((parentObject) => {
                      if (parentObject !== null) {
                        var newGraphData = generateGraphWithNewParent(graphData, parentObject);
                        overWriteGraphData(newGraphData);
                      } else {
                        setSnackBar({...snackBar, open: true, message: "No parents found", type: "info"})
                      }
                      setLoading(false)
                    })
                  }}
                > <PlayArrow sx={{transform: "rotate(180deg)"}}/>
              </Button>
            </Tooltip>
            <Button
                style={{borderRadius: "15px", fontFamily: "'Open Sans', sans-serif", fontSize: '14px', fontWeight: 800, color: 'white', background: `${setColor(nodeDatum.__rd3t.depth, nodeDatum.isInit)}`, textStroke: '1px rgba(0, 0, 0, 0.7)', WebkitTextStroke: '1px rgba(0, 0, 0, 0.7)'}}
                className={classes.button}
                variant="contained"
                onClick={toggleNode}
                >
                  <div className={classes.name}>{nodeDatum.name}</div>
            </Button>
            <Tooltip title="View Children" TransitionComponent={Zoom} placement="top">
              <Button name={"hyponymButton" + nodeDatum.name}
                style={{borderRadius: "15px",  color: "white", background: "#1c1d21"}}
                onClick={() => {
                  if(!nodeDatum.children) {
                    setLoading(true)
                    getChildren(nodeDatum, rwRequests).then((childrenObject) => {
                    if (childrenObject.length === 0) {
                      setSnackBar({...snackBar, open: true, message: "No children found", type: "info"})
                      setLoading(false)
                      return
                    }
                    var newGraphData = addChildrentoParentThenReturnNewGraphData(graphData, nodeDatum.name, childrenObject);
                    updateGraphData(newGraphData);})
                    setLoading(false)
                  }
                  toggleNode();
                }}
                > <PlayArrow />
              </Button>
            </Tooltip>
          </ButtonGroup>
          {
            nodeDatum.creeWords !== undefined ?
              <div className={classes.listContainer}>
              {
                nodeDatum.creeWords.length > 0 ?
                <List sx={{width: '100%', height: '100%'}}>
                {
                  Object.keys(nodeDatum.creeWords).map(
                    function(key, index){
                      return(
                          <ListItem key={index} component="div" sx={{width: '100%', padding: 0, margin: 0, borderBottom: '1px solid rgba(0, 0, 0, 0.5)'}}>
                            {/* Tooltip shows the first definition given for the word */}
                            <Tooltip describeChild title={<Typography fontSize={14}>{nodeDatum.creeWords[index].definitions[0].text}</Typography>} arrow TransitionComponent={Zoom}>
                              <ListItemButton sx={{width: '100%', borderRadius: 5}}>
                                <ListItemText primary={nodeDatum.creeWords[index].word} sx={{padding: '5px'}}/>
                              </ListItemButton>
                            </Tooltip>
                            <a target='_blank' href={'https://itwewina.altlab.app/word/' + nodeDatum.creeWords[index].slug + '/'}> 
                              <IconButton>
                                <InfoOutlined sx={{color: 'black', strokeWidth: 0.5}}/>
                              </IconButton>
                            </a>
                            <a target='_blank' href={window.location.href.replace(/wordtree.*/, '') + 'search/' + nodeDatum.creeWords[index].word + '/Default'}>
                              <IconButton>
                                <LaunchOutlined sx={{color: 'black', strokeWidth: 0.5}}/>
                              </IconButton>  
                            </a>
                          </ListItem> 
                      )
                    }
                  )
                }
              </List> :
              <Button sx={{color: 'black', alignContent: 'center'}}>No words found</Button>
              }
              </div>
              :
              <Container
                style={{
                  display: 'flex', flexDirection: 'column', 
                  alignItems: 'center', justifyContent: 'center', 
                  height: "200px", width: '100%', 
                  background: "#817F75", 
                  borderRadius: "15px"}}
              >
                {nodeDatum.creeWordsLoading === true ? <CircularProgress /> :
                <Button
                  name="generateCreeWords"
                  sx={{color: "white",
                  "&:hover": {
                    background: "#2c2d31"
                  }
                  , background: "#1c1d21", borderRadius: "15px"}}
                  onClick={() =>{  
                    if (!nodeDatum.creeWords) {
                      nodeDatum.creeWordsLoading = true;
                      reRender();
                      // wait for the data to load and capture the response
                      const nodeIndex = searchDomainIndex(nodeDatum.name)
                      searchRWByDomain(nodeIndex,rwRequests).then((creeWords) => {
                        nodeDatum.creeWords = creeWords;
                        nodeDatum.creeWordsLoaded = true;
                        var newGraphData = addCreeWordstoNodeThenReturnNewGraphData(graphData, nodeDatum.name, creeWords);
                        updateGraphData(newGraphData);
                        nodeDatum.creeWordsLoading = false;
                        reRender();
                      })
                    }
                  }}
                >
                Show Cree Words
              </Button>}
              </Container>
          }
        </Box>
      </foreignObject>
    </>
  )
};

export {RenderForeignObjectNode};
