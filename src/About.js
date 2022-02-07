import React from 'react'
import Toolbar from './components/Toolbar'

function About() {
    return(
        <>
            <Toolbar />
            <div >
                <h1>
                    OpenCode is an open source platform for coders to practice their skills and prepare for entering the job market. Our goal is to provide free coding problems as well as project ideas and solutions that
                    are thorough enough to be added to any resume, whether you're an experienced developer with many years in the workforce, or a new developer looking to land your first job. OpenCode was developed by
                    Zachary Zirkle of Team 7 Softworks, and the source code for each of the individual parts of the project can be found at the links below. Thank you for using our platform!
                </h1>
                <a>OpenCode front-end</a>
                <a>OpenCode back-end</a>
                <a>OpenCode testing suite</a>
            </div>
        </>
    )
}

export default About;