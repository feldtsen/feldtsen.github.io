import React, {useState} from 'react';
import './App.css';
import Intro from './Intro';
import Grid from '@material-ui/core/Grid';
import {useWindowSize} from '@react-hook/window-size/throttled'

function App() {
   const user = useState({
       name: 'feldtsen '
    }),
        [width, height] = useWindowSize(
            360,
            720,
            {fps:30}
        );

    return (
        <Grid container direction="column">

            <Grid item xs={12} className="App">
                <Intro windowHeight={height} windowWidth={width} user={user} />
            </Grid>

        </Grid>
    );
}

export default App
