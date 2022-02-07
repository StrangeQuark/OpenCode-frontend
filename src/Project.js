import React, { useEffect } from 'react'
import Toolbar from './components/Toolbar'
import './Project.css'

function Question() {
  //Grab the url search params
  const query = window.location.search
  const urlParameters = new URLSearchParams(query)
  const nameParameter = urlParameters.get('name')


  //URL for making the API calls
  var urlString = "http://localhost:8080/api/v1/project/" + nameParameter

  //Fetch the data after the initial rendering of the page
  //It is important to add the second argument, [], which runs this function only once after initial rendering
  //Without the second argument, this function will run after each time the page is re-rendered
  useEffect(() => {
    fetch(urlString)
      .then(response => response.json().then(function(json) {
          document.getElementById('project-div').innerHTML = json.projectHTML
      }));
  }, [])

  return(
      <>
          <Toolbar />
          
          <div id="project-div" className='project-div'/>
      </>
  )
}

export default Question;