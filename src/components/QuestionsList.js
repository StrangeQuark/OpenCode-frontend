import React from "react";
import "./QuestionList.css";

export default class QuestionsList extends React.Component {
    state = {
        loading: true,
        questions: null,
        displayedQuestions: null,
        questionsLength: null,
        currentPage: 1
    }

    async componentDidMount() {
        const data = []

        if(window.location.href.includes("user")) {
            const FETCH_URL_ATTEMPTS = "http://localhost:8080/api/v1/question/user-attempts/1"
            const FETCH_URL_COMPLETIONS = "http://localhost:8080/api/v1/question/user-completions/1"

            const attemptsResponse = await fetch(FETCH_URL_ATTEMPTS)
            const completionsResponse = await fetch(FETCH_URL_COMPLETIONS)

            const attempsFetchedData = await attemptsResponse.json()
            const completionsFetchedData = await completionsResponse.json()

            for(let value of completionsFetchedData) {
                data.push({Title: value.name, Completed: "True", Difficulty: value.difficulty, Author: value.author})
            }
            for(let value of attempsFetchedData) {
                if(!data.filter(e => e.Title === value.name).length > 0)
                    data.push({Title: value.name, Completed: "False", Difficulty: value.difficulty, Author: value.author})
            }
        }
        else if(window.location.href.includes("projects")) {
            const FETCH_URL = "http://localhost:8080/api/v1/project"

            const response = await fetch(FETCH_URL)

            const fetchedData = await response.json()

            for(let value of fetchedData) {
                data.push({Title: value.name, Difficulty: value.projectType, Author: value.author})
            }
        }
        else {
            const FETCH_URL = "http://localhost:8080/api/v1/question"

            const response = await fetch(FETCH_URL)

            const fetchedData = await response.json()

            for(let value of fetchedData) {
                data.push({Title: value.name, Difficulty: value.difficulty, Author: value.author})
            }
        }

        var arr = [...data]

        this.setState({questions: data, loading: false, questionsLength: data.length, displayedQuestions: arr.splice(0,5)})

        //Initialize the first button to be highlighted, since click on the home page will always load the first page of the questionList
        document.getElementById('pagination-button-1').style.color = 'green'
    }

    click(item, numOfPaginationButtons) {
        this.setState({currentPage: item})

        const ITEMS_PER_PAGE = 5

        var tempArray = []
        var counter = 0

        for(var i = (ITEMS_PER_PAGE*item)-ITEMS_PER_PAGE; i < ITEMS_PER_PAGE * item; i++) {
            if(this.state.questions[i] != undefined)
                tempArray[counter] = this.state.questions[i]
            counter++
        }

        this.setState({displayedQuestions: tempArray})

        for(var i = 1; i <= numOfPaginationButtons; i++) {
            document.getElementById('pagination-button-' + i).style.color = "white"
        }

        document.getElementById('pagination-button-' + item).style.color = 'green'
    }

    render() {
        const ITEMS_PER_PAGE = 5

        var numOfPaginationButtons
        var isProjectsPage = window.location.href.includes('projects')
        var isUserPage = window.location.href.includes('user')

        if(Number.isInteger(this.state.questionsLength/5))
            numOfPaginationButtons = this.state.questionsLength/5
        else
            numOfPaginationButtons = Math.floor(1 + this.state.questionsLength/5)

        return(
            <>
            { isUserPage ? <h1 className="question-table-header-user">Attempted questions</h1> : <></>}
            <table cellSpacing="0" className={isUserPage ? 'question-table-user' : 'question-table'} style={{height: 'auto', padding: '10px 10px'}}>
                <thead className='question-table-header'>
                    <tr>
                        <th><button className="no-background-button">Title</button></th>
                        { isUserPage ? <th><button className="no-background-button">Completed</button></th> : <></>}
                        <th><button className="no-background-button">{isProjectsPage ? "Type" : "Difficulty"}</button></th>
                        <th><button className="no-background-button">Author</button></th>
                    </tr>
                </thead>
                <tbody>
                    { this.state.loading ? <div>loading...</div> :
                    Object.values(this.state.displayedQuestions).map((obj, index) => (
                        <tr key={index} style={(index % 2 === 0) ? {"background-color": "#14161a", height: '100px'} : {height: '100px'}}>
                            {
                                Object.values(obj).map((value, index2) => (
                                        <td className={isUserPage ? "q-td-4" : "q-td-3"} key={index2}>
                                            { isUserPage ? 
                                                (index2 % 4 === 0) ? <a className="question-table-links" href={ "/question?name=" + value }>{value}</a> : value 
                                            : 
                                                (index2 % 3 === 0) ? <a className="question-table-links" href={ isProjectsPage ? "/project?name=" + value : "/question?name=" + value }>{value}</a> : value 
                                            }
                                        </td>
                                ))
                            }
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <ul className={isUserPage ? 'pagination-user' : 'pagination'}>
                <li><button className="no-background-button" onClick={() => {(this.state.currentPage === 1) ? this.click(this.state.currentPage, numOfPaginationButtons) : this.click(this.state.currentPage - 1, numOfPaginationButtons)}}>{'<'}</button></li>
                { this.state.loading ? <li></li> : 
                    Object.values(this.state.questions).map((obj,index) => (
                        (index % ITEMS_PER_PAGE === 0) && <li><button id={"pagination-button-" + (1 + index/ITEMS_PER_PAGE)} className="no-background-button" onClick={() => {this.click(1 + index/ITEMS_PER_PAGE, numOfPaginationButtons)}}>{1 + index/ITEMS_PER_PAGE}</button></li>
                    ))
                }
                <li><button className="no-background-button" onClick={() => {(this.state.currentPage === numOfPaginationButtons) ? this.click(this.state.currentPage, numOfPaginationButtons) : this.click(this.state.currentPage + 1, numOfPaginationButtons)}}>{">"}</button></li>
            </ul>
        </>
        )
    }
}