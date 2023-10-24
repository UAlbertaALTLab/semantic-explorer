import React from 'react';
// material ui button groups
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const options = ['Default', 'Verb', 'Particle', 'Noun'];

var pos = 'Default';
export {pos};

// This is the component for the tag button group
// Using Material UI
export default function SplitButton() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0)

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
        if (options[index] == 'Verb') {             
            pos = 'V'    
        }
        if (options[index] == 'Noun') {             
            pos = 'N'         
        }         
        if (options[index] == 'Particle') {             
            pos = 'Ipc'         
        }         
        if (options[index] == 'Default') {             
            pos = 'Default'         
        }  
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
        }

        setOpen(false);
    };

    // This is the main return statement for the tag button group component
    return (
        <React.Fragment>
        <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
            <Button>{options[selectedIndex]}</Button>
            <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            >
            <ArrowDropDownIcon />
            </Button>
        </ButtonGroup>
        <Popper
            sx={{
            zIndex: 1,
            }}
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
        >
            {({ TransitionProps, placement }) => (
            <Grow
                {...TransitionProps}
                style={{
                transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
            >
                <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                        <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                        >
                        {option}
                        </MenuItem>
                    ))}
                    </MenuList>
                </ClickAwayListener>
                </Paper>
            </Grow>
            )}
        </Popper>
        </React.Fragment>
    );
    }

