import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

import db from './db.json';

function SetMinWidth(width)
{
    if (width > 1200) return 32;
    return 100;
}

function NrOfColumns(width)
{
    if (width > 1200) return [1, 2, 3];
    return [1];
}

function Intro(props) {
   return (
        <Grid container
        style={{
            padding: 40
        }}
        direction="row"
        >
            {
                NrOfColumns(props.windowWidth).map((nr) =>
                    <Grid container 
                    key={"grid_container_"+nr}
                    direction="column"
                    style ={{
                        width: SetMinWidth(props.windowWidth) + "%",
                        margin: "0 auto"
                    }}
                    >
                    {
                        db.projects.filter((project) => nr === project.column || NrOfColumns(props.windowWidth).length === 1).map((project) =>   
                                <Grid item 
                                key ={"grid_item_" + project.id}  
                                style={{ 
                                    overflowY: "hidden", 
                                    overflowX: "hidden",
                                    width: "100%",
                                    paddingBottom: 20
                                }}
                                >
                                    <CardActionArea style={{borderRadius: "5px"}}>
                                        <CardMedia>
                                            <a href={`${project.link}`}>
                                                <img 
                                                src={require(`./pic/${project.title}.png`)} 
                                                alt="thumbnail" 
                                                className="thumbnails"  
                                                />
                                             </a>
                                        </CardMedia>
                                        <h2> {project.title} </h2>
                                        <p> {project.content} </p>
                                    </CardActionArea>
                                </Grid>
                            )
                        }
                    </Grid>
                )
            }   
        </Grid>
    );
}

export default Intro;

