import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'


function Intro(props) {
    let user = props.user[0];
    return (
        <Grid itemkey="grid_container_intro"  container>
            <Grid item 
            xs = {12}
            >
                <Box 
                style = {{
                    //backgroundColor: "#CCCCCC",
                    padding: "0 0 0 0",
                    fontSize: props.windowHeight * .06,
                    margin: "30px 0 0 0",
                    textAlign: "center"
                }}>
                    {user.name}
                </Box>
            </Grid>
        </Grid>
    );

}
export default Intro;

