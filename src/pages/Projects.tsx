import React from "react";
import "./css/Projects.css";
import { Avatar, useMediaQuery, Stack, Container, Grid } from '@mui/material';
import { TopBar } from "../components/topbar/Topbar";
import { ProjectCard } from "../components/project/ProjectCard";
import projects from "../assets/projects.json";

interface Project {
    title: string;
    description: string;
    link: string;
    image: string;
    year: string; 
    technologies: string[]; 
    type: 'Individual' | 'Team';  // Tipizza 'type' come 'Individual' o 'Team'
    context: String; 
}

const getImage = (imageName:any) => {
  try {
      return require(`./assets/projects/${imageName}`);
  } catch (error) {
      //console.error(`Image ${imageName} not found`, error);
      return null; // o una immagine di fallback
  }
};

export function Projects() {
    return (
        <>
        <div className="projects-page">
          <TopBar />
          <div className="projects-container">
            <div className="projects-grid">
                {projects.project.map((project, index) => (
                    <div className="project-item" key={index}>
                      <ProjectCard
                        title={project.title}
                        description={project.description}
                        link={project.link}
                        image={getImage(project.image)}
                        year={project.year}
                        technologies={project.technologies}
                        type={project.type as 'Individual' | 'Team'}
                        context={project.context} 
                      />
                    </div>
                ))}
            </div>
          </div>
        </div>
        </>
    );
}
