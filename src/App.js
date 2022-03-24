import './Scss/App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Nav from './Components/Nav.js';
import Home from './Pages/Home.js';
import Data from './Pages/Data.js';

function App() {
  return (
    <Router>
    <div className="App">
      <Nav />
        <Switch>
          <Route path="/data" component={Data}/>
          <Route path="/" exact component={Home}/>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
