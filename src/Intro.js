import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid'

function Intro(props) {
    let user = props.user[0];
    return (
        <Grid container style={{
            height: props.windowHeight * 0.6,
            fontSize: props.windowWidth >= 800 ? props.windowWidth * 0.04 : props.windowWidth * 0.07,
                paddingTop: props.windowHeight * 0.05,
                paddingLeft: props.windowWidth * 0.05
        }} className="Intro">
            <Grid item>{"<"}</Grid>
            <Grid item>{user.name}</Grid>
            <Grid item>/</Grid>
            <Grid item>></Grid>
        </Grid>
    );
}

export default Intro;

