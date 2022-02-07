import './App.css';
import Home from './Home';
import Blog from './Blog';
import About from './About';
import Login from './Login';
import Projects from './Projects';
import Project from './Project';
import SignUp from './SignUp';
import Question from './Question';
import {Route} from 'react-router-dom';
import ResetPasswordSearch from './ResetPasswordSearch';
import ResetPassword from './ResetPassword';
import UserProfile from './UserProfile';

function App() {
  return (
      <div className="App">
        <Route exact path="/" component={Home}/>
        <Route exact path="/question" component={Question}/>
        <Route exact path="/blog" component={Blog}/>
        <Route exact path="/about" component={About}/>
        <Route exact path="/projects" component={Projects}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={SignUp}/>
        <Route exact path="/password-reset" component={ResetPasswordSearch}/>
        <Route exact path="/new-password" component={ResetPassword}/>
        <Route exact path="/project" component={Project}/>
        <Route exact path="/user/:id" component={(props) => <UserProfile postId={props.match.params.id} />}/>
      </div>
  );
}

export default App;
