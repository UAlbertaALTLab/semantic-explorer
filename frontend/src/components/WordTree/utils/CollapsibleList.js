import React, { useState } from 'react';
import { ListItem, ListItemText, Collapse, List, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const CollapsibleList = ({ data, level = 1, onNodeClick }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    // When the list item itself is clicked, we recenter the graph on the node
    if (onNodeClick) {
      onNodeClick(data);  // Pass the node data for recentering
    }
  };

  const handleToggleClick = (event) => {
    // Prevent list item click from firing when the arrow is clicked
    event.stopPropagation();
    setOpen(!open);
  };

  return (
    <>
      <ListItem 
        button 
        onClick={handleClick}  // Recenter the graph on node click
        className={`level-${level}`}
        style={{ paddingLeft: level * 20 }}
      >
        {/* Display the index along with the domain name */}
        <ListItemText primary={`${data.index ? `${data.index} ` : ''}${data.name}`} />
        
        {/* Add an IconButton for the expand/collapse arrow */}
        <IconButton onClick={handleToggleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItem>
      
      {/* Collapsible child items */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.children && data.children.map((child, index) => (
            <CollapsibleList
              key={index}
              data={child}
              level={level + 1}
              onNodeClick={onNodeClick}  // Pass the click handler to child nodes
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default CollapsibleList;
