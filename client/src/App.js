import './index.css';
import {BrowserRouter, Switch, Route, Link, useHistory} from "react-router-dom";
import {useState,useEffect} from 'react';
import Register from "./Register";
import UserContext from "./UserContext";
import axios from "axios";
import Login from "./Login";
import Home from "./Home";

function App() {
  const [email,setEmail] = useState('');
  useEffect(() => {
    axios.get('http://localhost:4000/user', {withCredentials:true}).then(response => {
        setEmail(response.data.email);
      });
  }, []);

  function logout() {
    axios.post('http://localhost:4000/logout', {}, {withCredentials:true})
      .then(() => {
        setEmail('')
      });
  }

  return (
    <UserContext.Provider value={{email,setEmail}}>
      <BrowserRouter>
        <nav className='header'>
        <div>
        <Link to={'/login'}>
          <div className='logo'>Task Success</div>
        </Link>
        </div>
          
          {!email 
            && (
              <>
                <Link to={'/login'}>Sign In</Link>
              </>
          )}
          {!!email 
            && (
              <div className='profile'>
                <a className='logout' onClick={e => {e.preventDefault();logout();}}>Logout</a>
                <p>Name - {email}</p>
              </div>
          )}
        </nav>
        <main>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route exact path={'/register'} component={Register} />
            <Route exact path={'/login'} component={Login} />
          </Switch>
        </main>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;