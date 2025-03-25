import React, { useState, useEffect } from 'react';
import { Menu } from '@mui/icons-material';
import { Drawer, List } from '@mui/material';
import CollapsibleList from './utils/CollapsibleList';
import Tree from 'react-d3-tree';
import { Box, ButtonGroup, Button, ThemeProvider} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Add, Remove, CropFree} from '@mui/icons-material';
import { constructInitialGraph } from './utils/constructRWTreeData';
import { useParams } from 'react-router-dom';
import { theTheme } from '../../App';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PositionedSnackbar from '../common/CustomSnackBar';
import { useCenteredTree } from './utils/graphCenterer';
import './styles/WordTree.css'
import { useStyles } from './styles/styles';
import {RenderForeignObjectNode} from './RenderForeignObjectNode';

const theme = createTheme({
    palette: {
      primary: {
        main: '#D9D9D9',
      },
      secondary: {
        main: '#000000',
      },
    }
})

// This component is responsible for rendering the entire graph.
function WordGraph() {
  const [zoomValue, setZoomValue] = useState(1);
  const [Loading, setLoading] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const { domain } = useParams();
  const classes = useStyles();
  const minZoom = 0.1;
  const maxZoom = 5;
  const word = domain;
  const [graphData, setGraphData] = useState(constructInitialGraph(word));
  useEffect(() => {
    console.log("Graph Data:", graphData);
  }, [graphData]);
  const nodeSize = { x: 600, y: 500 };
  const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y,  x: -80 , y: -125};
  const [translate, containerRef] = useCenteredTree();
  const separation = { siblings: 1, nonSiblings: 2};
  const [count, setCount] = useState(0);
  const [snackBar, setSnackBar] = React.useState({
    open: false,
    message: '',
    type: 'success',
  });

 // Fetch index after component mounts
 useEffect(() => {
  let isMounted = true;

  return () => {
    isMounted = false;
  };
}, [word]);

  const toggleList = () => {
    setIsListOpen(!isListOpen);  // Toggle the state
  };

  const  zoomIn = () => {
      if (zoomValue + 0.5 >= maxZoom) return;
      setZoomValue(zoomValue + 0.5);
  }
  
  const zoomOut = () => {
      if (zoomValue - 0.5 <= minZoom) return;
      setZoomValue(zoomValue - 0.5);
  }

  const recenterGraph = () => {
    zoomIn()
    zoomOut()
  }
  const updateGraphData = (newGraphData) => {
    setGraphData({...graphData, newGraphData})
    console.log("graphData has been updated to", newGraphData)
  }
  
  const overWriteGraphData = (newGraphData) => {
    setGraphData(newGraphData)
    console.log("graphData has been overwritten to", graphData)
  }

  const reRender = () => {
    setCount(count + 1)
  }

  useEffect(()=>{
    if(theTheme == '#f5f5f5'){
      document.documentElement.style.setProperty('--zoomcolor', 'black');
      document.documentElement.style.setProperty('--branchcolor', 'black');
    }else{
      document.documentElement.style.setProperty('--zoomcolor', 'white');
      document.documentElement.style.setProperty('--branchcolor', 'white');
    }
  }, [theTheme])

  return (
    <>
      {Loading ? (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={Loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <ThemeProvider theme={theme}>
          <Box sx={{ height: '100%', width: '100%'}}>
            {/* Button to toggle the list drawer */}
            <Button
              onClick={toggleList}
              sx={{ position: 'absolute', top: 105, left: 3, zIndex: 1000}}  // Positioned at the top-left corner
            >
              <Menu color="secondary"/>
            </Button>
  
            {/* Drawer for the collapsible list */}
            <Drawer
              anchor="left"
              open={isListOpen}  // Control the drawer visibility
              onClose={toggleList}
              sx={{ width: 300, '& .MuiDrawer-paper': { width: 300 } }}
            >
              <List>
                <CollapsibleList 
                  data={graphData}
                  level={1} 
                />
              </List>
            </Drawer>
  
            {/* Main tree container */}
            <Box
              sx={{ height: '100%', width: '100%' }}
              ref={containerRef}
            >
              <Box flex={1} sx={{ position: 'relative', height: '100%' }}>
                
                {/* Zoom control buttons, positioned at the top-right corner */}
                <ButtonGroup
                  className="zoomGroup"
                  variant="text"
                  aria-label="zoom control button group"
                  color="secondary"
                  sx={{ position: 'absolute', right: 0, top: 10 }}
                >
                  <Button onClick={recenterGraph}>
                    <CropFree />
                  </Button>
                  <Button onClick={zoomIn}>
                    <Add />
                  </Button>
                  <Button onClick={zoomOut}>
                    <Remove />
                  </Button>
                </ButtonGroup>
  
                {/* Render the tree */}
                <Tree
                  style={{ position: 'relative' }}
                  data={graphData}
                  zoom={zoomValue}
                  nodeSize={nodeSize}
                  seperation={separation}
                  translate={translate}
                  scaleExtent={{ min: minZoom, max: maxZoom }}
                  focusedNodeId={graphData.name}
                  renderCustomNodeElement={(rd3tProps) =>
                    RenderForeignObjectNode({
                      ...rd3tProps,
                      foreignObjectProps,
                      classes,
                      graphData,
                      updateGraphData,
                      overWriteGraphData,
                      snackBar,
                      setSnackBar,
                      Loading,
                      setLoading,
                      reRender
                    })
                  }
                  orientation="horizontal"
                />
              </Box>
            </Box>
          </Box>
  
          {/* Snackbar component */}
          {snackBar.open && (
            <PositionedSnackbar snackBar={snackBar} setSnackBar={setSnackBar} />
          )}
        </ThemeProvider>
      )}
    </>
  );  
}

export default WordGraph;