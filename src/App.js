import React, {useState} from 'react';
import './App.css';
import Intro from './Intro';
import Projects from './Projects.js';
import Grid from '@material-ui/core/Grid';
import {useWindowSize} from '@react-hook/window-size/throttled'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';


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
        <React.Fragment>
            <CssBaseline/>
            <Intro windowHeight={height} windowWidth={width} user={user} />
            <Projects windowHeight={height} windowWidth={width} />
        </React.Fragment>
    );
}

export default App
