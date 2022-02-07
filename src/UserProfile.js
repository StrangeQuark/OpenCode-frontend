import React, { useEffect, useState } from "react";
import QuestionsList from './components/QuestionsList';
import Toolbar from './components/Toolbar';
import UserInfo from './components/UserInfo';

function UserProfile(props) {
    const [isValidProfile, setValidProfile] = useState()
    var urlString = "http://localhost:8080/api/v1/user/" + props.postId

    useEffect(() => {
        fetch(urlString)
            .then(response => response.json().then(function(json) {
                if(json != null) {
                    setValidProfile(true)
                }
                else {
                    var nonexistentUserDiv = document.getElementById('nonexistent-user-div')
                    document.getElementById('nonexistent-user-text-field').innerHTML = props.postId + " does not exist"
                    nonexistentUserDiv.hidden = false

                    //Move the request-success-div to the center of the screen once the width and height have been rendered
                    nonexistentUserDiv.style.marginTop = "-" + nonexistentUserDiv.offsetHeight / 2 + "px"
                    nonexistentUserDiv.style.marginLeft = "-" + nonexistentUserDiv.offsetWidth / 2 + "px"
                }
            }));
    }, [])
    
    return(
        <>
            <Toolbar />
            
            <div id="spacer-div" style={{height: "50px"}}></div>

            <div id="user-info-div" style={{float:"left", display:"inline", width: "30%"}}>
            {isValidProfile ? <UserInfo postId={props.postId} /> : <></>}
            </div>

            <div id="question-list-div" style={{float:"left", display:"inline", width: "50%"}}>
            {isValidProfile ? <QuestionsList postId={props.postId} /> : <></>}
            </div>

            <div id="nonexistent-user-div" className="request-div" hidden="true">
                <p id="nonexistent-user-text-field"></p>
            </div>
        </>
    )
}

export default UserProfile;