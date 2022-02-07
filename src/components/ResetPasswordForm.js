import React from "react";
import "./ResetPassword.css";

export default class ResetPasswordSearchForm extends React.Component {
    async componentDidMount() {
        //Since we are using a button outside of the form to handle the login attempt
        //let's listen to the username and password input fields for if the user
        //presses the enter key, and if so we can simulate a button click
        var passwordInput = document.getElementById('password')

        passwordInput.addEventListener('keyup', function onEvent(e) {
            if(e.code === "Enter") {
                document.getElementById('submit-button').click()
            }
        })

        //Change the size of some elements to be proportional to the screen
        var requestForm = document.getElementById('request-form')
        var requestSuccessTextField = document.getElementById('request-success-text-field')

        requestForm.style.width = (window.innerWidth / 8) + "px";
        requestForm.style.height = (window.innerHeight / 4) + "px";
        requestSuccessTextField.style.width = (window.innerWidth / 6) + "px";

        //Move the request-div to the center of the screen once the width and height have been rendered
        var requestDiv = document.getElementById('request-div')

        requestDiv.style.marginTop = "-" + requestDiv.offsetHeight / 2 + "px"
        requestDiv.style.marginLeft = "-" + requestDiv.offsetWidth / 2 + "px"
    }

    render() {
        function requestHandler() {
            //Get the search params
            const query = window.location.search
            const urlParameters = new URLSearchParams(query)
            const token = urlParameters.get('token')

            var nonMatchingPasswordMessage = document.getElementById('nonmatching-password-message')
            var noPasswordMessage = document.getElementById('no-password-message')
            var password = window.document.getElementById('password').value
            var confirmationPassword = window.document.getElementById('confirm-password').value
            var request = {"token": token, "password": password}

            //Reset when user attempts login
            nonMatchingPasswordMessage.hidden = true
            noPasswordMessage.hidden = true

            //If the user enters nothing, do nothing
            if(password === "") {
                noPasswordMessage.hidden = false
                return
            }
            //If the user enters nothing, do nothing
            if(password != confirmationPassword) {
                nonMatchingPasswordMessage.hidden = false
                return
            }

            fetch('http://localhost:8080/api/v1/password-reset/confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
                }).then(response => response.text().then(
                    function (text) {
                            var requestSuccessDiv = document.getElementById('request-success-div')
                            document.getElementById('request-success-text-field').innerHTML = text
                            document.getElementById('request-div').hidden = true
                            requestSuccessDiv.hidden = false

                            //Move the request-success-div to the center of the screen once the width and height have been rendered
                            requestSuccessDiv.style.marginTop = "-" + requestSuccessDiv.offsetHeight / 2 + "px"
                            requestSuccessDiv.style.marginLeft = "-" + requestSuccessDiv.offsetWidth / 2 + "px"
                    }
                ))
        }

        return(
            <>
            <div id="request-div" className="request-div">
                <h1 style={{color: "white"}}>New password</h1>
                <div id="nonmatching-password-message-div" style={{height: "100px"}} >
                    <b id="nonmatching-password-message" hidden="true" style={{color: "red"}}>Your passwords do not match</b>
                    <b id="no-password-message" hidden="true" style={{color: "red"}}>You must enter a password</b>
                </div>
                <form id="request-form" className="request-form">
                    <label for="password">New password:</label><br />
                    <div style={{height: "20px"}} />
                    <input type="password" id="password" name="password" placeholder="Type your password"/><hr />
                    <div style={{height: "20px"}} />

                    <label for="confirm-password">Confirm password:</label><br />
                    <div style={{height: "20px"}} />
                    <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your password"/><hr />
                </form>
                <button className="submit-button" id='submit-button' onClick={() => requestHandler()}>SUBMIT</button>
            </div>
            <div id="request-success-div" className="request-div" hidden="true">
                <p id="request-success-text-field"></p>
            </div>
            </>
        )
    }
}