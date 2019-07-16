import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid'

function Intro(props) {
    let user = props.user[0];
    return (
        <Grid container direction='column' style={{
            height: props.windowHeight * 0.6,
            fontSize: props.windowWidth >= 1000 ? props.windowWidth * 0.04 : 1.5 + 'em',
                paddingTop: props.windowHeight * 0.05,
                paddingLeft: props.windowWidth * 0.05
        }} className="Intro">
            <Grid item>{user.name}</Grid>
            <Grid item>{user.subTitle}</Grid>
        </Grid>
    );
}

export default Intro;

