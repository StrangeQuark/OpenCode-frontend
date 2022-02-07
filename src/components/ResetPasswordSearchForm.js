import React from "react";
import "./ResetPassword.css";

export default class ResetPasswordSearchForm extends React.Component {
    async componentDidMount() {
        //Since we are using a button outside of the form to handle the login attempt
        //let's listen to the username and password input fields for if the user
        //presses the enter key, and if so we can simulate a button click
        var usernameInput = document.getElementById('username')

        usernameInput.addEventListener('keyup', function onEvent(e) {
            if(e.code === "Enter") {
                document.getElementById('submit-button').click()
            }
        })

        //Change the size of some elements to be proportional to the screen
        var requestForm = document.getElementById('request-form')
        var noUsernameMessageDiv = document.getElementById('no-username-message-div')
        var requestSuccessTextField = document.getElementById('request-success-text-field')

        requestForm.style.width = (window.innerWidth / 8) + "px";
        requestForm.style.height = (window.innerHeight / 4) + "px";
        noUsernameMessageDiv.style.width = (window.innerWidth / 8) + "px";
        requestSuccessTextField.style.width = (window.innerWidth / 6) + "px";

        //Move the request-div to the center of the screen once the width and height have been rendered
        var requestDiv = document.getElementById('request-div')

        requestDiv.style.marginTop = "-" + requestDiv.offsetHeight / 2 + "px"
        requestDiv.style.marginLeft = "-" + requestDiv.offsetWidth / 2 + "px"
    }

    render() {
        function requestHandler(username) {
            var noUsernameMessage = document.getElementById('no-username-message')

            //Reset all the login error messages when the user attempts a login
            noUsernameMessage.hidden = true

            //If the user enters nothing, do nothing
            if(username === "") {
                noUsernameMessage.hidden = false
                return
            }

            fetch('http://localhost:8080/api/v1/password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(username)
                }).then(response => response.text().then(
                    function (text) {
                        if(text === "Sorry, we could not find your account") {
                            noUsernameMessage.hidden = false
                        }
                        else {
                            var requestSuccessDiv = document.getElementById('request-success-div')
                            document.getElementById('request-success-text-field').innerHTML = text
                            document.getElementById('request-div').hidden = true
                            requestSuccessDiv.hidden = false

                            //Move the request-success-div to the center of the screen once the width and height have been rendered
                            requestSuccessDiv.style.marginTop = "-" + requestSuccessDiv.offsetHeight / 2 + "px"
                            requestSuccessDiv.style.marginLeft = "-" + requestSuccessDiv.offsetWidth / 2 + "px"
                        }
                    }
                ))
        }

        return(
            <>
            <div id="request-div" className="request-div">
                <h1 style={{color: "white"}}>Reset password</h1>
                <div id="no-username-message-div" style={{height: "100px"}} >
                    <b id="no-username-message" hidden="true" style={{color: "red"}}>Sorry, we could not find your account</b>
                </div>
                <form id="request-form" className="request-form">
                    <label for="username">Username or email:</label><br />
                    <div style={{height: "20px"}} />
                    <input type="text" id="username" name="username" placeholder="Type your username or email"/><hr />
                </form>
                <button className="submit-button" id='submit-button' onClick={() => requestHandler(window.document.getElementById('username').value)}>SUBMIT</button>
            </div>
            <div id="request-success-div" className="request-div" hidden="true">
                <p id="request-success-text-field"></p>
            </div>
            </>
        )
    }
}