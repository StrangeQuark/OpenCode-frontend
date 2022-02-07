import React from 'react';
import Toolbar from './components/Toolbar';
import QuestionsList from './components/QuestionsList';

function Home() {
    return(
        <>
            <Toolbar />

            <div id="spacer-div" style={{height: "50px"}}></div>
            
            <QuestionsList />
        </>
    )
}

export default Home;