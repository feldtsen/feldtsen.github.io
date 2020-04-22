import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

import db from './db.json';


function Intro(props) {
   return (
        <div style={{padding: "40px"}}>
            <Grid  container justify="space-between"  spacing={6}
            >
                {
                    db.projects.map((project) =>   
                    <Grid item key ={"grid_item_" + project.id}  xs = {project.xs_width} sm={project.sm_width} md={project.md_width}>

                        <CardActionArea>
                        <Box style = {{
                                //backgroundColor: "#CCCCCC",
                            }}
                        key={"project_" + project.id} >
                                 <CardMedia >
                                <a href={`${project.link}`}>
                                <img src={require(`./pic/${project.title}.png`)} alt="thumbnail" className="thumbnails"  />
                                 </a>
                                </CardMedia>

                            </Box>
                                  </CardActionArea>
                    </Grid>
                )
            }
            </Grid>
        </div>
    );
}

export default Intro;

