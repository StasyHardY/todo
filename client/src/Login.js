import {useState, useContext} from 'react';
import axios from 'axios';
import UserContext from "./UserContext";
import {Link, Redirect} from "react-router-dom";

function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loginError,setLoginError] = useState(false);
  const [redirect,setRedirect] = useState(false);

  const user = useContext(UserContext);

  function loginUser(e) {
    e.preventDefault();

    const data = {email,password};
    axios.post('http://localhost:4000/login', data, {withCredentials:true})
      .then(response => {
        user.setEmail(response.data.email);
        setEmail('');
        setPassword('');
        setLoginError(false);
        setRedirect(true);
      })
      .catch(() => {
        setLoginError(true);
      });
  }

  if (redirect) {
    return <Redirect to={'/'} />
  }

  return (


    <div class="page">
  <div class="container">
    <div class="left">
      <div class="login"></div>
      <div class="eula"></div>
    </div>
    <div class="right">
      
      <form action="" onSubmit={e => loginUser(e)} class="form">
      <div class="title">
      <h1 >Sign In</h1>
      </div>
      
      {loginError && (
        <div>LOGIN ERROR! WRONG EMAIL OR PASSWORD!</div>
      )}
        <label for="email">Email</label>
        <input className='input' type="text " value={email} onChange={e => setEmail(e.target.value)}/>
        <label for="password">Password</label>
        <input className='input' value={password} onChange={e => setPassword(e.target.value)} type="password"/>
        <button class="btn" type="submit" id="submit" value="Submit">Отправить</button>
        <p className='title'>Don't have an account? <Link to='/register'>Sign Up</Link></p>
      </form>
    </div>
  </div>
</div>


    
  );
}

export default Login;