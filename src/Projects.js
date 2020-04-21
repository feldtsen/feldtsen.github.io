import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const projects = [
    {"name": "task 0", "width":6}, 
    {"name": "task 1", "width":6},
    {"name": "task 2", "width":6},
    {"name": "task 3aaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaal aaaaaaaaaa aaaaaaaaaaaaa", "width":6},
    {"name": "task 4", "width":6},
    {"name": "task 5", "width":6},
    {"name": "task 6", "width":6},
    {"name": "task 7", "width":6},
    {"name": "task 8", "width":6},
    {"name": "task 9", "width":6},
    {"name": "task 10djwjjjjjjjjjjjjjjjj jjjjjjjjjjjjjjjj jjjjjjjjjjjjjjj jjjjjjjjjjjjjjjjj", "width":6},
    {"name": "task 11", "width":6}
]

function Intro(props) {
    return (
 
        <div style={{padding: 10, width:"100%"}}>
        <Grid  container justify="space-between" alignItems="flex-start" spacing={2}
        style={{
        }}>
            {
            projects.map((project) =>   
                <Grid item key ={"grid_item_" + project.name}  xs = {project.width * 2} sm={project.width} md={project.width - 2}>
                    <Card style = {{
                            backgroundColor: "#CCCCCC",
                            height: props.windowHeight * 0.4,
                        }}
                    key={"project_" + project.name} >
                        <CardContent>
                            {project.name}
                        </CardContent>
                    </Card>
                </Grid>
            )
        }
        </Grid>
        </div>
    );
}

export default Intro;

