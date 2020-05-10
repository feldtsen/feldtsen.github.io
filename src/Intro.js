import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'


function Intro(props) {
    let user = props.user[0];
    return (
        <Grid  container>
            <Grid item 
            xs = {12}
            >
                <Box 
                style = {{
                    //backgroundColor: "#CCCCCC",
                    padding: "40px 0 20px 40px",
                    fontSize: props.windowHeight * .06
                }}>
                    {user.name}
                </Box>
            </Grid>
        </Grid>
    );

}
export default Intro;

