import React, {useState} from 'react';
import './App.css';
import Intro from './Intro';
import Grid from '@material-ui/core/Grid';

function App() {
    const user = useState({
        name: 'feldtsen',
        subTitle: 'computer science student'
    });

    return (
        <Grid container direction="column">

            <Grid item xs={12} className="App">
                <Intro user={user} />
            </Grid>

        </Grid>
    );
}

export default App
