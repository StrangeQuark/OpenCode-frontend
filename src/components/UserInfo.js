import React, { useEffect } from "react";

function UserInfo(props) {
    var username = null
    var localUsername = localStorage.getItem('username')
    var sessionUsername = sessionStorage.getItem('username')
    var urlString = "http://localhost:8080/api/v1/user/" + props.postId
    var allQuestionsUrlString = "http://localhost:8080/api/v1/question"
    var ctx
    var chartColors = ["green", "yellow", "grey"]

    function createChart(cx, cy, radius, arcwidth, values, colors) {
        var tot = 0;
        var accum = 0;
        var PI = Math.PI;
        var offset = -PI;
        ctx.lineWidth = arcwidth;

        for(var i=0; i < values.length; i++)
            tot += values[i]


        for(var i=0; i < values.length; i++){
            ctx.beginPath()
            ctx.arc(cx,cy,radius,
                offset+PI*(accum/tot),
                offset+PI*((accum+values[i])/tot)
            )
            ctx.strokeStyle = colors[i]
            ctx.stroke()
            accum += values[i]
        }
    }

    if(localUsername != null) {
        username = localUsername
    }
    if(sessionUsername != null) {
        username = sessionUsername
    }

    useEffect(() => {
        var total

        fetch(allQuestionsUrlString)
            .then(response => response.json().then(function(json) {
                total = json.length
        }));


        fetch(urlString)
            .then(response => response.json().then(function(json) {
                if(username === json.username)
                    document.getElementById('edit-button').hidden = false

                var questionsCompleted = json.questionsCompleted.length
                var questionsAttempted = json.questionsAttempted.length - questionsCompleted
                var questionsUnattempted = total - questionsAttempted - questionsCompleted
                var chartValues = [questionsCompleted, questionsAttempted, questionsUnattempted]

                document.getElementById('completed-label').innerHTML = "Questions completed: " + questionsCompleted + "/" + total
                document.getElementById('attempted-label').innerHTML = "Questions attempted: " + questionsAttempted + "/" + total
                document.getElementById('unattempted-label').innerHTML = "Questions unattempted: " + questionsUnattempted + "/" + total

                ctx = document.getElementById('canvas').getContext('2d')
                createChart(100, 100, 80, 18, chartValues, chartColors)
            }));
    }, [])

    return (
        <>
            <div style={{backgroundColor: "#282c34", color: "white", marginLeft: "20%", width:"100%", display: "flex", flexDirection: "column"}}>
                <div>
                    <h1 style={{float: "left", marginLeft: "3%"}}>{props.postId}</h1>
                    <button id="edit-button" hidden="true" style={{float:"right", margin:"10px"}}>Edit profile</button>
                </div>
                <div>
                    <canvas id="canvas" style={{float: "left", marginLeft: "3%"}}></canvas>
                    <div style={{display: "grid", float: "left", marginTop:"3%"}}>
                        <label id="completed-label" style={{color: "green"}} for="canvas"></label>
                        <div id="spacer" style={{height: "5px"}}></div>
                        <label id="attempted-label" style={{color: "yellow"}} for="canvas"></label>
                        <div id="spacer" style={{height: "5px"}}></div>
                        <label id="unattempted-label" style={{color: "grey"}} for="canvas"></label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserInfo;