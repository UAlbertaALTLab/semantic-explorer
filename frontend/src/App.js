import './App.css';
import {React, createContext, useState} from 'react';
import headerLogo from './images/altlablogo.png'
import light_footerLogo from './images/uofalogo_light.png';
import dark_footerLogo from './images/uofalogo_dark.png';
import SearchAppBar from './components/SearchAppBar/SearchAppBar';
import Wordgraph from './components/WordTree/WordTree';
import ResultsSection from './components/ResultsSection/ResultsSection';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Link
 } from 'react-router-dom';
import SimpleSpinner from './components/common/LoadingScreens';
import ReactSwitch from "react-switch";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
export const ThemeContext = createContext(null);

var theTheme = '#f5f5f5';
export {theTheme};

var footer_logo = light_footerLogo;
var footer = 'lightFooter';

// new update
// import a switch from material ui
// due to the structure of the project, I have to put the switch in the app.js file
// https://mui.com/material-ui/react-switch/
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

//  This is the main app component, which is rendered in the index.js file
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedAlready, setSearchedAlready] = useState(false); // used when displaying the search results
  const [graphMode, setGraphMode] = useState(false); // used to switch between graph and results

  var resultsSection = <ResultsSection/>

  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    theTheme = theTheme === "#f5f5f5" ? "#121212" : "#f5f5f5"
    footer_logo = footer_logo === light_footerLogo ? dark_footerLogo : light_footerLogo
    footer = footer === 'lightFooter' ? 'darkFooter' : 'lightFooter'
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  // This is the main return statement for the app component
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        
    <Router>
      <div className="App">
        <div id="header">
          <SearchAppBar setSearchedAlready={setSearchedAlready} searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
          </SearchAppBar>
        </div>

        {/* The body changes based on the URL */}
        <Routes id="Body">
          <Route path="/search/:searchTerm/:Pos" onError={(err) => console.error(err)} element={resultsSection} /> {/* comment this and uncomment next line to test graph directly */}
          <Route path="/dev/wordtree" element={<Wordgraph></Wordgraph>} /> 
          <Route path="/wordtree/rapidwords/:domain" element={<Wordgraph></Wordgraph>} />
        </Routes>

        <div id={footer}>
          <div id='footer_div'>
            <img id="footer_logo" src={footer_logo}/>
          </div>
          <div style={{flexGrow: 1}}></div>
          <div className="switch" align="right" style={{ marginRight: '20px'}}>
          {/* inspired by: https://github.com/machadop1407/dark-light-mode-react */}
          <MaterialUISwitch onChange={toggleTheme} checked={theme === "dark"} />
          </div>
        </div>
      </div>
    </Router>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
