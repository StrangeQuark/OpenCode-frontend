import React from "react";
import "./UserLoginForm.css";

export default class UserLoginForm extends React.Component {
    async componentDidMount() {
        //Since we are using a button outside of the form to handle the login attempt
        //let's listen to the username and password input fields for if the user
        //presses the enter key, and if so we can simulate a button click
        var usernameInput = document.getElementById('username')
        var passwordInput = document.getElementById('password')

        usernameInput.addEventListener('keyup', function onEvent(e) {
            if(e.code === "Enter") {
                document.getElementById('submit-button').click()
            }
        })
        passwordInput.addEventListener('keyup', function onEvent(e) {
            if(e.code === "Enter") {
                document.getElementById('submit-button').click()
            }
        })

        //Change the size of the login-form
        var loginForm = document.getElementById('login-form')

        loginForm.style.width = (window.innerWidth / 8) + "px";
        loginForm.style.height = (window.innerHeight / 4) + "px";

        //Move the login-div to the center of the screen once the width and height have been rendered
        var loginDiv = document.getElementById('login-div')

        loginDiv.style.marginTop = "-" + loginDiv.offsetHeight / 2 + "px"
        loginDiv.style.marginLeft = "-" + loginDiv.offsetWidth / 2 + "px"
    }

    render() {
        function loginHandler(username, password) {
            var loginJSON = {"username": username, "password": password}
            var noUsernameMessage = document.getElementById('no-username-message')
            var noPasswordMessage = document.getElementById('no-password-message')
            var failedLoginMessage = document.getElementById('failed-login-message')
            var userNotEnabledMessage = document.getElementById('user-not-enabled-message')

            //Reset all the login error messages when the user attempts a login
            noUsernameMessage.hidden = true
            noPasswordMessage.hidden = true
            failedLoginMessage.hidden = true
            userNotEnabledMessage.hidden = true

            //Check if the username and password are empty. If they are, return and make the
            //appropriate message visible. If both are empty, just default to prompting the
            //user for a username
            if(username === "") {
                noUsernameMessage.hidden = false
                return
            }
            if(password === "") {
                noPasswordMessage.hidden = false
                return
            }

            fetch('http://localhost:8080/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginJSON)
                }).then(response => response.text().then(
                    function (text) {
                        console.log(text)
                        if(text === "Login failed") {
                            failedLoginMessage.hidden = false
                        }
                        else if(text === "User not enabled") {
                            userNotEnabledMessage.hidden = false
                        }
                        else {
                            if(document.getElementById('remember-me-checkbox').checked) {
                                localStorage.setItem('username', text)
                            }
                            else {
                                localStorage.clear()
                                sessionStorage.setItem('username', text)
                            }
                            //Go back to the home page upon successful login
                            window.location.href="/"
                        }
                    }
                ))
        }

        return(
            <div id="login-div" className="login-div">
                <h1 style={{color: "white"}}>Login</h1>
                <div style={{height: "50px"}} >
                    <b id="failed-login-message" hidden="true" style={{color: "red"}}>Incorrect username or password</b>
                    <b id="user-not-enabled-message" hidden="true" style={{color: "red"}}>You must verify your account</b>
                    <b id="no-username-message" hidden="true" style={{color: "red"}}>You must enter a username</b>
                    <b id="no-password-message" hidden="true" style={{color: "red"}}>You must enter a password</b>
                </div>
                <form id="login-form" className="login-form">
                    <label for="username">Username:</label><br />
                    <div style={{height: "20px"}} />
                    <input type="text" id="username" name="username" placeholder="Type your username"/><hr />
                    <div style={{height: "20px"}} />
                    <label for="password">Password:</label><br />
                    <div style={{height: "20px"}} />
                    <input type="password" id="password" name="password" placeholder="Type your password"/><hr />
                    <div id="remember-me-div" className="remember-me-div">
                        <input type="checkbox" id="remember-me-checkbox" className="remember-me-checkbox"></input>
                        <label className="remember-me-label" for="remember-me-checkbox">Remember me</label>
                        <a className="forgot-password" href="/password-reset">Forgot password?</a><br />
                    </div>
                </form>
                <div style={{height: "50px"}} />
                <button className="submit-button" id='submit-button' onClick={() => loginHandler(window.document.getElementById('username').value, window.document.getElementById('password').value)}>LOGIN</button>
                <div style={{height: "100px"}} />
                <h4 style={{color: "white"}}>Need an account?</h4>
                <a className="sign-up" href="/signup">Sign up</a>
            </div>
        )
    }
}