import React, {useState} from 'react';
import './App.css';
import Intro from './Intro';

function App() {
    const user = useState({
        name: 'feldtsen'
    });

    return (
        <div className="App">
            <Intro user={user} />
        </div>
    );
}

export default App
