import React from "react";
import "./UserSignUpForm.css";

export default class UserSignUpForm extends React.Component {
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

        //Change the size of the signup-form
        var signUpForm = document.getElementById('signup-form')
        var requestSuccessTextField = document.getElementById('request-success-text-field')

        signUpForm.style.width = (window.innerWidth / 8) + "px";
        signUpForm.style.height = (window.innerHeight / 4) + "px";
        requestSuccessTextField.style.width = (window.innerWidth / 6) + "px";

        //Move the signup-div to the center of the screen once the width and height have been rendered
        var signUpDiv = document.getElementById('signup-div')

        signUpDiv.style.marginTop = "-" + signUpDiv.offsetHeight / 2 + "px"
        signUpDiv.style.marginLeft = "-" + signUpDiv.offsetWidth / 2 + "px"
    }

    render() {
        function registrationHandler(username, password, email, confirmPassword) {
            var signUpJSON = {"username": username, "password": password, "email": email}

            //Grab the error messages
            var noUsernameMessage = document.getElementById('no-username-message')
            var noEmailMessage = document.getElementById('no-email-message')
            var noPasswordMessage = document.getElementById('no-password-message')
            var nonMatchingPasswordMessage = document.getElementById('nonmatching-password-message')
            var usernameAlreadyTakenMessage = document.getElementById('username-already-taken-message')
            var emailAlreadyTakenMessage = document.getElementById('email-already-taken-message')

            //Reset all the error messages when the user attempts to sign up
            noUsernameMessage.hidden = true
            noEmailMessage.hidden = true
            noPasswordMessage.hidden = true
            nonMatchingPasswordMessage.hidden = true
            usernameAlreadyTakenMessage.hidden = true
            emailAlreadyTakenMessage.hidden = true

            //Check if the username, password, or email are empty
            if(username === "") {
                noUsernameMessage.hidden = false
                return
            }
            if(email === "") {
                noEmailMessage.hidden = false
                return
            }
            if(password === "") {
                noPasswordMessage.hidden = false
                return
            }

            //Check if the password and confirmation password match
            if(password != confirmPassword) {
                nonMatchingPasswordMessage.hidden = false
                return
            }
            

            fetch('http://localhost:8080/api/v1/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpJSON)
                }).then(response => response.text().then(
                    function (text) {
                        if(text === "Success") {
                            var requestSuccessDiv = document.getElementById('request-success-div')
                            document.getElementById('request-success-text-field').innerHTML = "Thank you for signing up! An email has been sent to " + signUpJSON.email + " with a " +
                                                                                              "confirmation link to activate your account. <a href='/login'>Click here</a> to return to the login page"
                            document.getElementById('signup-div').hidden = true
                            requestSuccessDiv.hidden = false

                            //Move the request-success-div to the center of the screen once the width and height have been rendered
                            requestSuccessDiv.style.marginTop = "-" + requestSuccessDiv.offsetHeight / 2 + "px"
                            requestSuccessDiv.style.marginLeft = "-" + requestSuccessDiv.offsetWidth / 2 + "px"
                        }
                        if(text === "Username taken") {
                            usernameAlreadyTakenMessage.hidden = false
                        }
                        if(text === "Email taken") {
                            emailAlreadyTakenMessage.hidden = false
                        }
                    }
                ))
        }

        return(
            <>
                <div id="signup-div" className="signup-div">
                    <h1 style={{color: "white"}}>Sign up</h1>
                    <div style={{height: "50px"}} >
                        <b id="username-already-taken-message" hidden="true" style={{color: "red"}}>Username already taken</b>
                        <b id="email-already-taken-message" hidden="true" style={{color: "red"}}>Email already taken</b>
                        <b id="no-username-message" hidden="true" style={{color: "red"}}>You must enter a username</b>
                        <b id="no-email-message" hidden="true" style={{color: "red"}}>You must enter an email</b>
                        <b id="no-password-message" hidden="true" style={{color: "red"}}>You must enter a password</b>
                        <b id="nonmatching-password-message" hidden="true" style={{color: "red"}}>Your passwords do not match</b>
                    </div>
                    <form id="signup-form" className="signup-form">
                        <label for="username">Username:</label><br />
                        <div style={{height: "20px"}} />
                        <input type="text" id="username" name="username" placeholder="Type your username"/><hr />
                        <div style={{height: "20px"}} />

                        <label for="email">Email:</label><br />
                        <div style={{height: "20px"}} />
                        <input type="text" id="email" name="email" placeholder="Type your email"/><hr />
                        <div style={{height: "20px"}} />

                        <label for="password">Password:</label><br />
                        <div style={{height: "20px"}} />
                        <input type="password" id="password" name="password" placeholder="Type your password"/><hr />
                        <div style={{height: "20px"}} />

                        <label for="confirm-password">Confirm password:</label><br />
                        <div style={{height: "20px"}} />
                        <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your password"/><hr />
                    </form>
                    <div style={{height: "200px"}} />
                    <button className="submit-button" id='submit-button' onClick={() => registrationHandler(window.document.getElementById('username').value, window.document.getElementById('password').value, window.document.getElementById('email').value, window.document.getElementById('confirm-password').value)}>SIGN UP</button>
                    <div style={{height: "100px"}} />
                </div>
                <div id="request-success-div" className="request-div" hidden="true">
                    <p id="request-success-text-field"></p>
                </div>
            </>
        )
    }
}