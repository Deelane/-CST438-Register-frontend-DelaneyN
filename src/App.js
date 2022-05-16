import './App.css';
import SchedList from './components/SchedList';
import Semester from './components/Semester';
import AddStudent from './components/AddStudent';
import Home from './components/Home';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
  		<Link to="/">Home</Link>{' '}
		<Link to="/semester">Schedule</Link>{' '}
		<Link to="/addstudent">Add Student</Link>{' '}
       <Switch>
        <Route exact path='/' component={Home} />
        <Route path ='/semester' component={Semester} />
        <Route path='/schedule' component={SchedList} />
        <Route path ='/addstudent' component={AddStudent}/>
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

/**      <AppBar position="static" color="default">
        <Toolbar>
        </Toolbar>
      </AppBar>
       */