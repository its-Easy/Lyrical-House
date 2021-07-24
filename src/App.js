import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import Posts from './components/Main/Posts/Posts'
import Shayari from './components/Main/Posts/Shayari'
import ShortStory from './components/Main/Posts/ShortStory'
import MakePost from './components/Main/MakePost/MakePost'
import Profile from './components/Main/Profile/ProfilePage'

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path='/signUp' component={SignUp}></Route>
        <Route exact path='/signIn' component={SignIn}></Route>
        <Route exact path='/home' component={Posts}></Route>
        <Route exact path='/home/shayari' component={Shayari}></Route>
        <Route exact path='/home/short-stories' component={ShortStory}></Route>
        <Route exact path = '/makePost' component={MakePost}></Route>
        <Route path = '/profile' component={Profile}></Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;