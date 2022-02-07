import React, { useState, forwardRef, useImperativeHandle } from "react"
import {Controlled as CodeMirror} from "react-codemirror2"
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/keymap/sublime'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/darcula.css'
import 'codemirror/mode/clike/clike'

const CodeMirrorEditor = forwardRef((props, ref) => {
    const [editorText, changeEditorText] = useState(props.code)

    const [editorTheme, changeEditorTheme] = useState(props.theme)

    const [editorMode, changeEditorMode] = useState(props.mode)

    const editable = props.editable

    const lineNumbers = props.lineNumbers

    const editor = <CodeMirror value={editorText} options={{ 
                        theme: editorTheme, 
                        keyMap: 'sublime', 
                        mode: editorMode,
                        lineNumbers: lineNumbers,
                        tabSize: 2,
                        styleActiveLine: true,
                        matchBrackets: true,
                        autoCloseBrackets: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                        if(editable)
                            changeEditorText(value)
                    }}
                    />

    useImperativeHandle(ref, () => ({
        updateEditorText(text) {
            changeEditorText(text)
        },
        getEditorText() {
            return editorText
        },
        updateEditorTheme(theme) {
            changeEditorTheme(theme)
        },
        updateEditorMode(mode) {
            changeEditorMode(mode)
        }
    }))

    return(
        editor
    )
})

export default CodeMirrorEditor