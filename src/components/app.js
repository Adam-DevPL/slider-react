import React from 'react';
import Slider from './slider'
import userGithub from './userGithub';


const App = () => (
    <div className="wrapper">
        <h1 className="mainHeader">Github user login: </h1>
        <Slider slides={userGithub} />
    </div>

);

export default App;