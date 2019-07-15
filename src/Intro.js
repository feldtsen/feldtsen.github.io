import React from 'react';
import './App.css';

function Intro(props) {
    let user = props.user[0];
    return (
        <div className="Intro">
            <h1>{user.name}</h1>
            <h3>{user.subTitle}</h3>
        </div>
    );
}

export default Intro;

