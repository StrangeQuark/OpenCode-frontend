import React from "react";
import "./Toolbar.css";
import logo from "../res/logo.png"

function Toolbar() {
    var username = null
    var localUsername = localStorage.getItem('username')
    var sessionUsername = sessionStorage.getItem('username')

    if(localUsername != null) {
        username = localUsername
    }
    if(sessionUsername != null) {
        username = sessionUsername
    }

    function displayPopout() {
        document.getElementById('user-popout-container').hidden = !document.getElementById('user-popout-container').hidden
    }

    function logout() {
        localStorage.clear()
        sessionStorage.clear()
        window.location.href="/"
    }

    function navigateToUserProfile() {
        window.location.href="/user/" + username
    }

    return (
        <div className="Toolbar">
            <img src={ logo } />
            <a href="/">Home</a>
            <a href="/projects">Projects</a>
            <a href="/about">About</a>
            { (username === null) ? <a href="/login">Login</a> : <a onClick={displayPopout}>{username}</a> }
            <div id='user-popout-container' className="user-popout-container" hidden="true">
                <button onClick={() => {navigateToUserProfile()}}>Profile</button>
                <button>Settings</button>
                <button onClick={() => {logout()}}>Logout</button>
            </div>
        </div>
    );
}

export default Toolbar;