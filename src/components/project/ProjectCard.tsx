import React from 'react';
import './ProjectCard.css';
import { Card, CardContent, CardMedia, Typography, Button, CardActions, Box, Chip, IconButton, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';


interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  image: string;
  year: string; 
  technologies: string[]; 
  type: 'Individual' | 'Team';  // Tipizza 'type' come 'Individual' o 'Team'
  context: String;  // Tipizza 'context' con le opzioni specifiche
}


export function ProjectCard({ title, description, link, image, year, technologies, type, context }: ProjectCardProps) {

  const contextIcons = {
    University: <SchoolIcon className='context-icon'/>,
    Work: <WorkIcon className='context-icon'/>,
    Personal: <HomeIcon className='context-icon'/>,
  };

  // Use the default icon if 'context' is not one of the specified keys
  const selectedContextIcon = contextIcons[context as keyof typeof contextIcons] || <PublicIcon className='context-icon'/>;

  const collaborationIcon = {
    Team: <GroupIcon className='collaboration-icon'/>,
    Individual: <PersonIcon className='collaboration-icon'/>,
  }



  return (
    <Card className="project-card">
      <div className="project-card-year-badge">{year}</div>
      {link !== "#" && (
      <IconButton
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="github-icon"
        aria-label="View on GitHub"
      >
        <GitHubIcon />
      </IconButton>
    )}
     <Box className="project-card-icons" display="flex" justifyContent="flex-end" alignItems="center">
          <Tooltip title={type} arrow>
              {collaborationIcon[type]}
          </Tooltip>
          <Tooltip title={context} arrow>
            {selectedContextIcon}
          </Tooltip>
      </Box>
      <CardMedia
        className='project-card-image'
        component="img"
        image={image}
        alt={title}
      />

      <CardContent className='project-card-content'>
        <Typography  gutterBottom variant="h5" component="div" className='project-card-title'>
          {title}
        </Typography>
        <Typography variant="body2" className='project-card-description'>
          {description}
        </Typography>

    
        
        <Box className="project-card-technologies" mt={2}>
          {technologies.map((tech, index) => (
            <Chip key={index} label={tech} className="project-card-chip" />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

