import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { responsiveFontSizes } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


function Intro(props) {
    let user = props.user[0];
    return (
        <Grid  container justify="stretch">
            <Grid item xs = {12}>
                <Box style = {{
                        backgroundColor: "#CCCCCC",
                        padding: "10px"
                    }}>
                    <CardContent>
                    {user.name}
                    </CardContent>
                </Box>
            </Grid>
        </Grid>
    );

}
export default Intro;

