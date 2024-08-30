import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../images/logo.png";
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () =>{
    navigate('/signup')
  }
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ backgroundColor: "#FFFFFF" }}>
          <IconButton edge="start" sx={{ ml: 4 }}>
            <img src={logo} style={{ height: "85px", width: "85px" }} alt="logo" />
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          {isMobile ? (
            <>
              <IconButton sx={{ color: 'black', mr: 2 }} onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary="Home" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary="Category" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText primary="Search" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemText onClick={handleButtonClick} primary="SignUp" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <>
              <Button  sx={{ color: "black", ml: 2 ,cursor:'pointer'}} >
                Home
              </Button>
              <Button  sx={{ color: "black", ml: 2 }}>
                Category
              </Button>
              <IconButton sx={{ color: 'black', ml: 2 }}>
                <SearchIcon />
              </IconButton>
              <Button onClick={handleButtonClick} sx={{ backgroundColor: '#5459E8', color: 'white', ml: 2, mr: 8, borderRadius: 0, width: '124px' }}>
                SignUp
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
