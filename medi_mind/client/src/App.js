import './App.css';
import {Switch,Route} from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import AdminNavbar  from './admincomp/AdminNavbar';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Uhome from './user/Uhome';
import Profile from './user/Profile';
import Enterudata from './user/Enterudata'
import Record from './user/Record'
import Recordview from './user/Recordview'
import Imageadd from './user/Addimage'
function App() {
  return (
    <>
    <Switch>
      <Route exact path="/" component={AdminNavbar} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/uhome/:token" component={Uhome} />
      <Route exact path="/profile/:token" component={Profile} />
      <Route exact path="/enterudata/:token" component={Enterudata} />
      <Route exact path="/record/:token" component={Record} />
      <Route exact path="/recordview/:token" component={Recordview} />
      <Route exact path="/imageadd/:token" component={Imageadd} />
    </Switch>
    
    
    
    </>
  );
}

export default App;
