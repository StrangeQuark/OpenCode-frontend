import React, { useEffect, useRef, useState } from 'react'
import Toolbar from './components/Toolbar'
import CodeMirrorEditor from './components/CodeMirrorEditor'
import './Question.css'

function Question() {
  //Grab the url search params
  const query = window.location.search
  const urlParameters = new URLSearchParams(query)
  const nameParameter = urlParameters.get('name')

  //Grab the bottom panel of the screen
  // var response_text_area = document.getElementById('response_text_area')

  //Grab the bottom panel of the screen
  var run_tests_text_area = document.getElementById('run_tests_text_area')

  //URL for making the API calls
  var urlString = "http://localhost:8080/api/v1/question/" + nameParameter

  //Reference to CodeMirrorEditor
  const codeMirrorRef = useRef()

  //Reference to CodeMirrorEditor
  const executionPanelRef = useRef()

  //Variable to hold the initial codemirror text
  const [editorText, setEditorText] = useState()

  //Fetch the data after the initial rendering of the page
  //It is important to add the second argument, [], which runs this function only once after initial rendering
  //Without the second argument, this function will run after each time the page is re-rendered
  useEffect(() => {
    fetch(urlString)
      .then(response => response.json().then(function(json) {
        insertProblemHTML(json.questionHTML)
        setEditorText(json.editorStartingText)
      }));
  }, [])


  //Get correct answer from database
  function executeCorrectAnswer() {
    fetch(urlString)
      .then(response => response.json().then(function(json) {
        insertProblemHTML(json.questionHTML)
      }));
  }


  //Helper function to insert text into inner html of left toolbar
  function insertProblemHTML(html) {
    document.getElementById('question-toolbar').innerHTML = html
  }


  // //Submit the text inside the CodeMirror editor to the API for compilation,
  // //and get the cmd line output and error output and display them in the
  // //bottom panel of the page
  // function codeToLogs() {
  //   var text = codeMirrorRef.current.getEditorText()
  //   console.log(text)

  //   fetch('http://localhost:8080/api/java', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: text
  //   }).then(response => response.text().then(
  //     function (text) {
  //       response_text_area.value = text
  //     }
  //   ))
  // }


  //Submit the text inside the CodeMirror editor to the API for compilation,
  //and get the cmd line output and error output and display them in the
  //bottom panel of the page
  function runTests() {
    fetch(urlString).then(response => response.json().then(function(json) {
        var text = codeMirrorRef.current.getEditorText()
        var answer = json.correctAnswer
        var tests = json.testFileText

        var allClasses = tests + "\n\n" + text + "\n\n" + answer

        fetch('http://localhost:8080/api/java', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: allClasses
        }).then(response => response.text().then(
          function (text) {
            executionPanelRef.current.updateEditorText(text)
          }
        ))
        }));
  }


  //Change colors of components based on which theme is selected
  function changeTheme(sel) {
    var toolbar = document.getElementById('editor-toolbar')
    var questionToolbar = document.getElementById('question-toolbar')
    // var compileButton = document.getElementById('compile-button')
    var runTestsButton = document.getElementById('run-tests-button')
    var themeSelect = document.getElementById('themes')
    var languageSelect = document.getElementById('language')
    var selection = sel.options[sel.selectedIndex].value


    if (selection === 'default') {
      codeMirrorRef.current.updateEditorTheme('default')

      executionPanelRef.current.updateEditorTheme('default')

      toolbar.style.backgroundColor = "#ffffff"

      // compileButton.style.backgroundColor = "#ffffff"
      // compileButton.style.color = "#000000"

      questionToolbar.style.backgroundColor = "#ffffff"
      questionToolbar.style.color = "#000000"

      runTestsButton.style.backgroundColor = "#ffffff"
      runTestsButton.style.color = "#000000"

      themeSelect.style.backgroundColor = "#ffffff"
      themeSelect.style.color = "#000000"

      languageSelect.style.backgroundColor = "#ffffff"
      languageSelect.style.color = "#000000"
    }
    else if (selection === 'darcula') {
      codeMirrorRef.current.updateEditorTheme('darcula')

      executionPanelRef.current.updateEditorTheme('darcula')

      toolbar.style.backgroundColor = "#2b2b2b"

      // compileButton.style.backgroundColor = "#2b2b2b"
      // compileButton.style.color = "#a9b7c6"

      questionToolbar.style.backgroundColor = "#2b2b2b"
      questionToolbar.style.color = "#a9b7c6"

      runTestsButton.style.backgroundColor = "#2b2b2b"
      runTestsButton.style.color = "#a9b7c6"

      themeSelect.style.backgroundColor = "#2b2b2b"
      themeSelect.style.color = "#a9b7c6"

      languageSelect.style.backgroundColor = "#2b2b2b"
      languageSelect.style.color = "#a9b7c6"
    }
  }

  function changeLanguage(sel) {
    var selection = sel.options[sel.selectedIndex].value

    codeMirrorRef.current.updateEditorMode(selection)
  }

  return(
      <>
          <Toolbar />
          <div id='top-div' className="top-div">
            <div id='top-container' className="top-container">
              <div id="question-toolbar" className="question-toolbar"></div>
              <div className="editor-container">
                <div id="editor-toolbar" className="editor-toolbar">

                  <button id="run-tests-button" onClick={runTests}>Execute tests</button>

                  {/* <button id="compile-button" onClick={codeToLogs}>Compile and Run</button> */}

                  {/* <label for="themes">Theme:</label> */}

                  <select name="themes" id="themes" onChange={e => changeTheme(e.target)}>
                    <option value="darcula">Darcula</option>
                    <option value="default">Default</option>
                  </select>

                  <select name="language" id="language" onChange={e => changeLanguage(e.target)}>
                    <option value="text/x-java">Java</option>
                  </select>

                </div>
              {/* This 'editorText &&' doesn't render this component until editorText is defined in the useEffect function */}
              {editorText && <CodeMirrorEditor ref={codeMirrorRef} code={editorText} theme={'darcula'} mode={'text/x-java'} editable={true} lineNumbers={true}/>}
              </div>
            </div>
            <div id="response_div" className="bottom-toolbar">
              <CodeMirrorEditor className="CodeMirror-full-height" ref={executionPanelRef} code={""} theme={'darcula'} mode={'text/x-java'} editable={true} lineNumbers={false}/>
              {/* <textarea name="run_tests_text_area" id="run_tests_text_area" readOnly={true} className="tests-text-area"></textarea> */}
              {/* <textarea name="response_text_area" id="response_text_area" readOnly="true" className="response-text-area"></textarea> */}
            </div>
          </div>
      </>
  )
}

export default Question;