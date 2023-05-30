import {BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import FunctionTab from './components/FunctionTab';
import PrivateShareLink from './components/PrivateShareLink';
import ShareLink from './components/ShareLink';
import Uploader from './components/Uploader';
import Gallery from './UserRegistration/pages/Gallery';
import Login from './UserRegistration/pages/Login';
import SignUp from './UserRegistration/pages/SignUp';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path ="/">
          <Login/>
        </Route>
        <Route exact path ="/signup">
          <SignUp/>
        </Route>
        <Route exact path ="/btn">
          <ShareLink/>
          <PrivateShareLink/>
          <Uploader/>
        </Route>
        <Route exact path ="/home">
          <Gallery/>
        </Route>
        <Route exact path ="/test">
          <FunctionTab/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
