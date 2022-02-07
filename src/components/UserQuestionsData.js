import React from "react";

function UserQuestionData(props) {
    var username = null
    var localUsername = localStorage.getItem('username')
    var sessionUsername = sessionStorage.getItem('username')

    if(localUsername != null) {
        username = localUsername
    }
    if(sessionUsername != null) {
        username = sessionUsername
    }

    return (
        <></>
    );
}

export default UserQuestionData;