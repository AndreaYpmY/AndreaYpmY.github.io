
import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Icona del menu, puoi scegliere un'altra icona se preferisci
import './Topbar.css';

export function TopBar() {
  return (
    <AppBar position="fixed" className='app-bar'>
      <Toolbar className='tool-bar'>
          {/* Logo a sinistra */}
          <IconButton edge="start" className='logo-button'component={Link} to="/" >
              <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Logo" className="logo" />
          </IconButton>

          {/* Pulsante per la sezione About e Project */}
          <div className="nav-buttons-container">
              <Button  variant="outlined" component={Link} to="/projects" className="nav-button">
                 Projects
              </Button>
              {/*<Button component={Link} to="/other" className="nav-button">
                  Other (Coming Soon)
  </Button>*/}
          </div>
          
      </Toolbar>
    </AppBar>
  );
}