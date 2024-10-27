
import React from "react";
import "./css/About.css";
import { Container, Typography, Avatar, Box, Grid, Button, IconButton, Divider, Stack, Chip} from '@mui/material';
import data from "../json/me.json";
import { TopBar } from "../components/topbar/Topbar";
import { SiGmail, SiGithub, SiInstagram, SiDiscord } from 'react-icons/si'; // Importa le icone social

const calculateAge = (birthDate: string): number => {
    const birth = new Date(birthDate);
    const today = new Date();
    
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
};

const getImage = (imageName:any) => {
    try {
        return require(`${process.env.PUBLIC_URL}/assets/${imageName}`);
    } catch (error) {
        //console.error(`Image ${imageName} not found`, error);
        return null; // o una immagine di fallback
    }
};

export function About() {
    
    return (

        <>
             <div className="my-div">
                <TopBar />
                <Container maxWidth={false} className="container">
                    <Stack spacing={4}>
                        {/* Sezione Avatar e Informazioni Personali */}
                        <Box display="flex" alignItems="flex-start" className="info-container">
                            <Avatar src={getImage(data.avatarUrl)} className="avatar" />
                            <Box ml={3} className="info">
                                <Typography variant="h4"><strong>{data.name} {data.surname}</strong></Typography>
                                <Typography variant="h6"><strong>Age:</strong> {calculateAge(data.birthDate)}</Typography>
                                <Typography variant="h6"><strong>Currently:</strong> {data.profession}</Typography>
                            </Box>
                        </Box>

                        <Divider />

                        {/* Titoli */}
                        <Box>
                            <Typography variant="h5" className="section-title">
                                Career
                            </Typography>

                            <Box className="education-container">
                                {data.career.map((item, index) => (
                                    <Box key={index} className="education-item">
                                        <Typography variant="body1" className="qualification">
                                            {item.qualification} [{item.start} - {item.end}]
                                        </Typography>
                                        <Typography variant="body2" className="place">
                                            {item.place}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    
                        <Divider />
                            {/* Sezione Interessi */}
                        <Box>
                            <Typography variant="h5" className="section-title">
                                My Interests
                            </Typography>
                            <Box className="interests-container" >
                                {data.interests.map((interest, index) => (
                                <Chip
                                    key={index}
                                    label={interest.label}
                                    className="interest-chip"
                                    variant="outlined"
                                    icon={<span>{interest.icon}</span>} // Icona per rappresentare l'emoji
                                />
                                ))}
                            </Box>
                        </Box>



                        <Divider />

                        {/* Sezione Social */}
                        <Box className="social-container">
                            <IconButton className="icon-button custom-icon" color="default" href="https://github.com/AndreaYpmY" target="_blank">
                                <SiGithub  />
                            </IconButton>
                            <IconButton className="icon-button custom-icon" color="default" href="https://www.instagram.com/andrea.t1_" target="_blank">
                                <SiInstagram />
                            </IconButton>
                            <IconButton className="icon-button custom-icon" color="default" href="mailto:tocci.andrea15@gmail.com" target="_blank">
                                <SiGmail />
                            </IconButton>
                            <IconButton className="icon-button custom-icon" color="default" href="https://discord.com/users/294458417429348352" target="_blank">
                                <SiDiscord />
                            </IconButton>
                        </Box>
                    </Stack>
                </Container>
            </div>
        </>
    );
}
