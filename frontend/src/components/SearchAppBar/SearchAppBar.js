import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { alpha, makeStyles } from '@material-ui/core/styles';
import headerLogo from '../../images/altlablogo.png'
import SearchIcon from "@mui/icons-material/Search";
import TagButtonGroup from '../common/TagButtonGroup/TagButtonGroup';
import {useNavigate, Link} from 'react-router-dom';
import {pos} from '../common/TagButtonGroup/TagButtonGroup.js';
import MaterialUISwitch from '../common/ThemeSwitchButton/ThemeSwitchButton';
import { Button } from '@material-ui/core';
import { createTheme } from '@mui/material/styles';
import './SearchAppBar.css'

var searched = false; // has a search event taken place?
const setSearchedFalse = () =>{ 
  searched = false
}
export {searched, setSearchedFalse};

// This is the style sheet for the search bar
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    width: '5.5rem',
    marginRight: '10px',
    marginBottom: '5px'
  },
  toolbar: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(3),
      width: '20%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  tagButtonGroup: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  Button: {
    color: 'white',
    backgroundColor: '#1976d2',
    marginRight: '15px',
    marginTop: '10px',
    marginBottom: '10px',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
  }
}));

// Component for the search bar
export default function SearchAppBar({setSearchedAlready, searchQuery, setSearchQuery}) {
    const classes = useStyles();

    const gotToResults = useNavigate();
    function changeRoute(searchQuery){
      gotToResults(`/search/${searchQuery}/${pos}`)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        searched = true;
        setSearchedAlready(true);
        changeRoute(searchQuery);
    };

    

    return (
        <div className={classes.root}>
        <AppBar position="static"
            style={{backgroundColor: 'black',
          height: 'fit-content',}}
          data-testid="AppBar"
        >
            <Toolbar className={classes.toolbar}>
              <Link to={``}>
                <img src={headerLogo} className={classes.logo} data-testid="logo"/>
              </Link>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <form
                  onSubmit={handleSubmit}
                >
                  <InputBase
                  name = "searchInput"
                  onInput={(e) => {
                      setSearchQuery(e.target.value);
                  }}
                  placeholder="Search…"
                  classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search', 'data-testid': 'searchInput'}}
                  />
                </form>
              </div>
              <div>
                {/* onClick button for onSubmit */}
                <Button varient="contained" className={classes.Button} onClick={handleSubmit} data-testid="searchButton">Search</Button>
              </div>
              <div className={classes.tagButtonGroup}>
                <TagButtonGroup/>
              </div>
              <div style={{flexGrow: 1}}></div> 
            </Toolbar>
        </AppBar>
        </div>
    );
}
