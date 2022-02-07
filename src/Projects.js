import React from 'react'
import Toolbar from './components/Toolbar'
import QuestionsList from './components/QuestionsList';

function Projects() {
    return(
        <>
            <Toolbar />

            <div id="spacer-div" style={{height: "50px"}}></div>
            
            <QuestionsList />
        </>
    )
}

export default Projects;